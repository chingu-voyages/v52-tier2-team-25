import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function getOptimizedRoute(coordinates) {
  if (!coordinates || !coordinates.length) {
    throw new Error("Coordinates array is required");
  }

  // Format coordinates to longitude,latitude format that Mapbox expects
  const formattedCoordinates = coordinates
    .map((coord) => {
      if (Array.isArray(coord)) {
        return coord.join(",");
      }
      throw new Error("Invalid coordinate format");
    })
    .join(";");

  const url = `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${formattedCoordinates}?geometries=geojson&access_token=${
    import.meta.env.VITE_MAPBOX_API_KEY
  }`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  if (!data.trips || !data.trips[0]) {
    throw new Error("No route found");
  }

  // Return the coordinates array from the geometry
  return data.trips[0].geometry.coordinates;
}

export async function geocodeAddress(address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${import.meta.env.VITE_MAPBOX_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;
      return [longitude, latitude];
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error geocoding address:", error);
    return null;
  }
}
