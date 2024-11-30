import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const App = () => {
  const [showCanvas, SetShowCanvas] = useState(false);
  const [mode, setMode] = useState(true);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);
  const dayNightMode = useRef(null);
  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);
  useEffect(() => {
    const dayNightClick = () => {
      setMode((prevMode) => {
        if (prevMode) {
          gsap.to("body", {
            backgroundColor: "#000",
            color: "#fff",
          });
        } else {
          gsap.to("body", {
            backgroundColor: "#fff",
            color: "#000",
          });
        }
        return !prevMode;
      });
    };
    const dayNightElement = dayNightMode.current;
    dayNightElement.addEventListener("click", dayNightClick);
    return () => dayNightElement.removeEventListener("click", dayNightClick);
  }, [mode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      gsap.to(growingSpan.current, {
        left: e.clientX - 10,
        top: e.clientY - 10,
        duration: 0.3,
        delay: 0.09,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    const headingClick = (e) => {
      SetShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.to("body", {
            backgroundColor: "#fd2c2a",
            color: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            innerHTML: "",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
              gsap.to("span.growing", {
                backgroundColor: "#fff",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fff",
            duration: 0.2,
          });
          gsap.to("span.growing", {
            backgroundColor: "#fd2c2a",
          });
        }
        return !prevShowCanvas;
      });
    };

    const handleHeadingHover = (e) => {
      gsap.to(growingSpan.current, {
        width: "80px",
        height: "80px",
        left: e.clientX - 30,
        top: e.clientY - 30,
        duration: 0.3,
        ease: "power2.out",
      });
      growingSpan.current.innerHTML = `<img src="https://thirtysixstudio.com/dist/pepper.529367f1.png" alt="Pepper" style="width: 100%; height: 100%; object-fit: contain;">`;
    };

    const handleHeadingLeave = () => {
      gsap.to(growingSpan.current, {
        width: "20px",
        height: "20px",
        duration: 0.3,
        ease: "power2.out",
      });
      growingSpan.current.innerHTML = "";
    };

    const headingElement = headingRef.current;
    headingElement.addEventListener("click", headingClick);
    headingElement.addEventListener("mouseenter", handleHeadingHover);
    headingElement.addEventListener("mouseleave", handleHeadingLeave);

    return () => {
      headingElement.removeEventListener("click", headingClick);
      headingElement.removeEventListener("mouseenter", handleHeadingHover);
      headingElement.removeEventListener("mouseleave", handleHeadingLeave);
    };
  }, []);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing top-[-20px] rounded-full left-[-20px] w-5 h-5 fixed block flex items-center justify-center text-black cursor-none pointer-events-none"
      ></span>
      <div className="relative w-full min-h-screen">
        {showCanvas &&
          window.innerWidth >= 470 &&
          data[0].map((canvasDetails, index) => (
            <Canvas key={index} details={canvasDetails} />
          ))}
        <div className="w-full h-screen">
          <nav className="flex flex-col md:flex-row justify-between items-center w-full p-4 z-50">
            <span className="text-xl md:text-2xl mb-4 md:mb-0">
              Thirtysixstudio
            </span>
            <div className="checkbox-wrapper-54 ">
              <label className="switch">
                <input type="checkbox" ref={dayNightMode} />
                <span className="slider"></span>
              </label>
            </div>
            <ul className="flex flex-wrap gap-4 md:gap-8 justify-center">
              {["Home", "About", "Projects", "Contact"].map((link, index) => (
                <li key={index}>
                  <a
                    href={`${link.toLowerCase()}`}
                    className="text-sm md:text-base relative after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-[#fd2c2a] after:left-0 after:bottom-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-left"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <hr className="mx-[1%] border-gray-300 border-y-2 "></hr>
          <div className="textcontainer mt-4 md:mt-7 w-full px-4 md:px-[15%] lg:px-[25%]">
            <div className="text w-full md:w-[70%] lg:w-[50%]">
              <h3 className="text-2xl md:text-3xl lg:text-4xl">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-sm md:text-base mt-4 md:mt-7 w-full md:w-[90%] lg:w-[80%] font-normal">
                We're a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns.
              </p>
              <p className="text-lg md:text-xl mt-4 md:mt-7">Scroll</p>
            </div>
            <div className="w-full absolute bottom-0 left-0">
              <h1
                ref={headingRef}
                className="text-[12vw] md:text-[14vw] lg:text-[16vw] pl-2 md:pl-5 leading-none font-normal tracking-tight cursor-pointer"
              >
                Thirtysixstudio
              </h1>
            </div>
          </div>
        </div>
      </div>
      <hr className="mx-[1%] border-gray-300 border-y-2"></hr>
      <div className="relative w-full min-h-screen flex flex-col md:flex-row justify-center mt-10 md:mt-20 items-center px-4 md:px-0">
        {showCanvas &&
          window.innerWidth >= 470 &&
          data[1].map((canvasDetails, index) => (
            <Canvas key={index} details={canvasDetails} />
          ))}
        <div className="w-full md:w-[30%] flex justify-start items-center md:text-left mb-8 md:mb-0">
          <h1> 01 - WHAT WE DO</h1>
        </div>
        <div className="w-full md:w-[30%]">
          <div className="text-2xl md:text-3xl lg:text-4xl">
            We aim to revolutionize digital production in the advertising space,
            bringing your ideas to life.
          </div>
          <div className="mt-16 md:mt-32">
            <p className="my-5 md:my-10 text-base md:text-lg">
              As a contemporary studio, we use cutting-edge design practices and
              the latest technologies to deliver seamless digital work.
            </p>
            <p className="my-5 md:my-10 text-base md:text-lg">
              Our commitment to creativity, innovation, and simplicity, paired
              with our agile approach, ensures your journey with us is smooth
              and enjoyable from start to finish.
            </p>
          </div>
        </div>
      </div>
      <hr className="mx-[1%] border-gray-300 border-y-2"></hr>
      <div className=" relative w-full min-h-screen flex flex-wrap md:flex-col justify-center mt-10 md:mt-20 items-center px-4 md:px-0">
        {showCanvas &&
          window.innerWidth >= 470 &&
          data[3].map((canvasDetails, index) => (
            <Canvas key={index} details={canvasDetails} />
          ))}
        <div className="w-[50%] h-[50%]  flex flex-col items-start justify-center">
          <p className="text-xl my-10 font-bold">our services</p>
          <p className="text-3xl font-semibold  whitespace-normal">
            We provide captivating design, interactive animations, advanced
            usability, reliable code, and immaculate project coordination.
            Whether you need a campaign built from scratch or assistance at a
            specific phase, we've got you covered.
          </p>
        </div>
        <hr className="mx-[10px] border-gray-300 border-y-2"></hr>

        <div className="w-full md:w-[50%] h-auto md:h-[50%] mt-10 flex flex-col items-start justify-center px-4 md:px-0">
          <div className="w-full space-y-4 md:space-y-6">
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg md:text-xl">
                <span>Creative</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <hr className="border-gray-300 border-y-2"></hr>
              <p className="text-gray-600 mt-3 text-sm md:text-base group-open:animate-fadeIn">
                Strategic creative direction and conceptualization for digital
                campaigns and experiences.
              </p>
            </details>
            <hr className="border-gray-300 border-y-2"></hr>

            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg md:text-xl">
                <span>Animation</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <hr className="border-gray-300 border-y-2"></hr>
              <p className="text-gray-600 mt-3 text-sm md:text-base group-open:animate-fadeIn">
                Dynamic motion graphics and interactive animations that bring
                your content to life.
              </p>
            </details>
            <hr className="border-gray-300 border-y-2"></hr>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg md:text-xl">
                <span>Design</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <hr className="border-gray-300 border-y-2"></hr>
              <p className="text-gray-600 mt-3 text-sm md:text-base group-open:animate-fadeIn">
                Modern UI/UX design solutions focused on user experience and
                visual aesthetics.
              </p>
            </details>
            <hr className="border-gray-300 border-y-2"></hr>
            <details className="group">
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none text-lg md:text-xl">
                <span>Technology</span>
                <span className="transition group-open:rotate-180">▼</span>
              </summary>
              <hr className="border-gray-300 border-y-2"></hr>
              <p className="text-gray-600 mt-3 text-sm md:text-base group-open:animate-fadeIn">
                Cutting-edge development using latest frameworks and
                technologies for optimal performance.
              </p>
            </details>
            <hr className="border-gray-300 border-y-2"></hr>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
