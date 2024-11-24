import bgVid from "/vid.mp4";
import { Card } from "@/components/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { IoHelpBuoy, IoCall, IoArrowDownOutline } from "react-icons/io5";
import { Navbar } from "@/components/Navbar";

export function Landing() {
  const navigate = useNavigate();
  const gotToPath = (obj) => {
    navigate(obj.path, { state: obj.state });
  };

  return (
    <div className="container w-screen h-screen">
      <div className="container w-full h-full overflow-x-hidden">
        <Navbar />
        <section className="relative flex flex-col items-center justify-center w-full h-full overflow-hidden text-white home gap-28">
          <video
            loop
            autoPlay
            muted
            className="absolute inset-0 z-[-2] w-full h-auto"
          >
            <source src={bgVid} type="video/mp4" />
          </video>

          <h1
            aria-label="hero text"
            className="w-8/12 font-semibold text-center text-8xl leading-20"
          >
            CALIFORNIA SOLAR PANEL PROGRAM
          </h1>
          <div className="flex flex-col items-center justify-center font-semibold CTA">
            <h3>Learn more</h3>
            <IoArrowDownOutline />
          </div>
        </section>
        <section className="flex flex-col items-center justify-center w-full gap-20 services bg-gradient-to-t from-black to-sky-950 py-44">
          <h2 className="text-4xl text-white">Services</h2>
          <div className="relative w-full">
            <div className="flex flex-wrap items-center justify-center gap-10">
              <Card />
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center w-full h-full text-white about bg-gradient-to-t from-sky-950 to-black py-44">
          <h2 className="text-5xl">About us</h2>
          <div className="content w-[80rem] p-10">
            <p className="text-[1.8em] text-center text-sky-100">
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
        <section className="flex flex-col items-center justify-center w-full h-full bg-white contact py-44">
          <h2 className="text-4xl text-black">Get In Touch</h2>
          <div className="pt-5 pb-20 content">
            <Link>
              <p className="flex items-center gap-3 text-sky-950">
                <IoHelpBuoy />
                +1 265-555-6589
              </p>
              <p className="flex items-center gap-3 text-sky-950">
                <IoCall />
                help.solarite@mail.com
              </p>
            </Link>
          </div>
          <Button
            onClick={() => gotToPath({ path: "/login", state: "signup" })}
            label="Schedule visit"
          />
        </section>
      </div>
    </div>
  );
}
