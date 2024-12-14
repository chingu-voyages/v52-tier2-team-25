import bgVid from "/vid.mp4";
import { Card } from "@/components/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { IoHelpBuoy, IoCall, IoArrowDownOutline } from "react-icons/io5";
import { Navbar } from "@/components/Navbar";

export function Landing() {
  const navigate = useNavigate();
  const goToPath = (obj) => {
    navigate(obj.path, { state: obj.state });
  };

  return (
    // Ensure the outermost container uses overflow-x-hidden
    <div className="w-screen h-screen overflow-x-hidden">
      {/* Use full height/width container */}
      <div className="w-full h-full">
        <Navbar />
        {/* Home Section */}
        <section className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden text-white home gap-20">
          {/* Video Background */}
          <video
            loop
            autoPlay
            muted
            className="absolute inset-0 w-full h-full object-cover z-[-2]"
          >
            <source src={bgVid} type="video/mp4" />
          </video>

          {/* Hero Text */}
          <h1
            aria-label="hero text"
            className="text-6xl sm:text-8xl leading-tight text-center w-10/12 sm:w-8/12 font-semibold"
          >
            CALIFORNIA SOLAR PANEL PROGRAM
          </h1>
          {/* CTA */}
          <div className="flex flex-col items-center font-semibold">
            <h3>Learn more</h3>
            <IoArrowDownOutline />
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="flex flex-col items-center justify-center w-full gap-20 services bg-gradient-to-t from-black to-sky-950 py-20"
        >
          <h2 className="text-4xl text-white">Services</h2>
          <div className="w-full max-w-6xl px-5">
            <div className="flex flex-wrap items-center justify-center gap-10">
              <Card />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="flex flex-col items-center justify-center w-full text-white about bg-gradient-to-t from-sky-950 to-black py-20"
        >
          <h2 className="text-5xl">About us</h2>
          {/* Use max width and padding for responsive design */}
          <div className="content max-w-4xl w-full px-5 mt-10">
            <p className="text-lg sm:text-2xl text-center text-sky-100">
              At Solarite, we are dedicated to providing affordable and
              sustainable solar energy solutions for homes and businesses. Our
              team of experts works closely with clients to design and install
              efficient solar panel systems that reduce energy costs and
              minimize environmental impact. With a focus on quality,
              reliability, and customer satisfaction, we are committed to
              helping create a cleaner, greener future for each and everyone.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="flex flex-col items-center justify-center w-full bg-white contact py-20"
        >
          <h2 className="text-5xl text-black">Get In Touch</h2>
          <div className="pt-5 pb-20 content">
            <Link>
              <p className="flex gap-3 items-center text-sky-950">
                <IoHelpBuoy />
                +1 265-555-6589
              </p>
              <p className="flex gap-3 items-center text-sky-950">
                <IoCall />
                help.solarite@mail.com
              </p>
            </Link>
          </div>
          <Button
            onClick={() => goToPath({ path: "/login", state: "signup" })}
            label="Schedule visit"
          />
        </section>
      </div>
    </div>
  );
}
