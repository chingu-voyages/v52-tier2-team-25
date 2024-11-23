import solariteLogo from "/solarite-logo-w.svg";
import { Navbar } from "@/components/Navbar";
import bgVid from "/vid.mp4";
import { Card } from "@/components/Card";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { IoHelpBuoy, IoCall, IoArrowDownOutline } from "react-icons/io5";

export function Landing() {
  return (
    <div className="container w-full h-full overflow-x-hidden">
      {" "}
      <header className="flex justify-between w-full items-center z-10 text-white p-5 fixed backdrop-blur-[5px]">
        <Link to="/">
          <img src={solariteLogo} alt="solarite logo" className="w-h-14 h-14" />
        </Link>
        <Navbar />
        <Button
          label="Login"
          className="bg-white text-black rounded-full px-9 py-2 hover:bg-transparent hover:border hover:text-white transition-all duration-500"
        />
      </header>
      <section className="home relative text-white flex flex-col justify-center items-center w-full h-full gap-28 overflow-hidden">
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
          className="text-8xl font-semibold text-center w-8/12 leading-20"
        >
          CALIFORNIA SOLAR PANEL PROGRAM
        </h1>
        <div className="CTA flex flex-col items-center justify-center font-semibold">
          <h3>Learn more</h3>
          <IoArrowDownOutline />
        </div>
      </section>
      <section className="services h-full w-full bg-gradient-to-t from-black to-sky-950 flex items-center flex-col justify-center gap-20 py-44 overflow-hidden">
        <h2 className="text-4xl text-white">Services</h2>
        <div className="w-full h-full relative">
          <div className="services-cards-div flex flex-wrap items-center justify-center gap-36">
            <Card title="Installation" />
            <Card title="Maintenance" />
            <Card title="Haul-away" />
          </div>
        </div>
      </section>
      <section className="about text-white bg-gradient-to-t from-sky-950 to-black w-full h-full flex flex-col items-center justify-center py-44">
        <h2 className="text-4xl">About us</h2>
        <div className="content w-[50rem] p-10">
          <p>
            At Solarite, we are dedicated to providing affordable and
            sustainable solar energy solutions for homes and businesses. Our
            team of experts works closely with clients to design and install
            efficient solar panel systems that reduce energy costs and minimize
            environmental impact. With a focus on quality, reliability, and
            customer satisfaction, we are committed to helping create a cleaner,
            greener future for each and everyone.
          </p>
        </div>
      </section>
      <section className="contact bg-white flex-col w-full h-full flex items-center justify-center py-44">
        <h2 className="text-4xl text-black">Get In Touch</h2>
        <div className="content pt-5 pb-20">
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
        <Button label="Schedule visit"/>
      </section>
    </div>
  );
}
