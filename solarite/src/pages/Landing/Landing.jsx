import bgVid from "/vid.mp4";
import { Card } from "@/components/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { useNavigate } from "react-router-dom";
import { IoHelpBuoy, IoCall, IoArrowDownOutline } from "react-icons/io5";
import { Navbar } from "@/components/Navbar";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="container w-screen h-screen">
      <div className="container overflow-x-hidden w-full h-full">
        <Navbar />
        <section className="flex overflow-hidden relative flex-col gap-28 justify-center items-center w-full h-full text-white home">
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
            className="w-8/12 text-8xl font-semibold text-center leading-20"
          >
            CALIFORNIA SOLAR PANEL PROGRAM
          </h1>
          <div className="flex flex-col justify-center items-center font-semibold CTA">
            <h3>Learn more</h3>
            <IoArrowDownOutline />
          </div>
        </section>
        <section
          id="services"
          className="flex flex-col gap-20 justify-center items-center py-44 w-full bg-gradient-to-t from-black services to-sky-950"
        >
          <h2 className="text-4xl text-white">Services</h2>
          <div className="relative w-full">
            <div className="flex flex-wrap gap-10 justify-center items-center">
              <Card />
            </div>
          </div>
        </section>

        <section
          id="about"
          className="flex flex-col justify-center items-center py-44 w-full h-full text-white bg-gradient-to-t to-black about from-sky-950"
        >
          <h2 className="text-5xl">About us</h2>
          <div className="content w-[80rem] p-10">
            <p className="text-[1.8em] text-center text-sky-100 text-pretty">
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
        <section
          id="contact"
          className="flex flex-col justify-center items-center py-44 w-full h-full bg-white contact"
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
          <Button onClick={() => navigate("/login")} label="Schedule visit" />
        </section>
      </div>
    </div>
  );
}
