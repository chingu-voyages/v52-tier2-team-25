import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { geocodeAddress, getOptimizedRoute } from "@/components/lib/utils";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_API_KEY;
mapboxgl.accessToken = MAPBOX_TOKEN;

// const destinations = [
//   "29 Hillhaven Drive, Los Angeles, CA 90036",
//   "526 S Ardmore Ave, Los Angeles, CA 90020",
//   "1720 Menlo Ave, Los Angeles, CA 90006",
//   "942 S Eastman Ave, Los Angeles, CA 90023",
// ];

function Map({ appointments, setOptimizedAppointments }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null); // Add ref to store map instance
  const [optimizedRoute, setOptimizedRoute] = useState(null);
  const [destinationsCoordinates, setDestinationsCoordinates] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const startingCoordinates = [-118.254669, 34.050838];

  // First useEffect to initialize map
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: startingCoordinates || [-118.2437, 34.0522],
      zoom: 12,
    });

    mapRef.current.on("load", () => {
      setMapLoaded(true);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []); // Empty dependency array as we only want to initialize once

  // Second useEffect to fetch coordinates and route
  useEffect(() => {
    const fetchOptimizedRoute = async () => {
      try {
        // Then, geocode all destination addresses
        const destCoords = await Promise.all(
          appointments.map((appointment) =>
            geocodeAddress(appointment.user.address)
          )
        );

        // Combine starting point with destinations
        const allCoordinates = [
          startingCoordinates,
          ...destCoords.filter((coord) => coord !== null),
        ];
        setDestinationsCoordinates(allCoordinates);

        if (allCoordinates.length >= 2) {
          const routeGeometry = await getOptimizedRoute(allCoordinates);
          setOptimizedRoute(routeGeometry);
          const orderedAppointments = appointments
            .map((appointment, index) => ({
              ...appointment,
              coordinates: destCoords[index],
            }))
            .sort((a, b) => {
              const indexA = routeGeometry.findIndex(
                (coord) =>
                  coord[0] === a.coordinates[0] && coord[1] === a.coordinates[1]
              );
              const indexB = routeGeometry.findIndex(
                (coord) =>
                  coord[0] === b.coordinates[0] && coord[1] === b.coordinates[1]
              );
              return indexA - indexB;
            });
          setOptimizedAppointments(orderedAppointments);
        }
      } catch (error) {
        console.error("Error fetching optimized route:", error);
      }
    };

    fetchOptimizedRoute();
  }, [appointments]); // Empty dependency array as we only want to fetch once

  // Third useEffect to update map with markers and route
  useEffect(() => {
    if (
      !mapLoaded ||
      !mapRef.current ||
      !destinationsCoordinates.length ||
      !optimizedRoute
    ) {
      return;
    }

    // Clear existing markers and route
    const markers = document.getElementsByClassName("mapboxgl-marker");
    while (markers[0]) {
      markers[0].remove();
    }

    // Add markers for all points
    destinationsCoordinates.forEach((coordinates, index) => {
      new mapboxgl.Marker({
        color: index === 0 ? "#FF0000" : "#3887be",
      })
        .setLngLat(coordinates)
        .setPopup(
          new mapboxgl.Popup().setHTML(
            index === 0 ? "Starting Point" : `Destination ${index}`
          )
        )
        .addTo(mapRef.current);
    });

    // Add or update route
    if (mapRef.current.getSource("route")) {
      mapRef.current.removeLayer("route");
      mapRef.current.removeSource("route");
    }

    const routeGeoJSON = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: optimizedRoute,
      },
    };

    mapRef.current.addSource("route", {
      type: "geojson",
      data: routeGeoJSON,
    });

    mapRef.current.addLayer({
      id: "route",
      type: "line",
      source: "route",
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
      },
    });

    // Fit the map to show all points
    const bounds = new mapboxgl.LngLatBounds();
    destinationsCoordinates.forEach((coord) => {
      bounds.extend(coord);
    });
    mapRef.current.fitBounds(bounds, { padding: 50 });
  }, [mapLoaded, destinationsCoordinates, optimizedRoute]);

  return (
    <div className="rounded-lg overflow-hidden h-[400px]">
      <div ref={mapContainerRef} className="h-full w-full" />
    </div>
  );
}

export default Map;
