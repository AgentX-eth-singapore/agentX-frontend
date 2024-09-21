import { Parallax, ParallaxBanner } from "react-scroll-parallax";

const Hero = () => {
  return (
    <ParallaxBanner
      layers={[{ image: "/images/bg.png", speed: -20 }]}
      className="w-full h-screen"
    >
      <div className="absolute inset-0 bg-white">
        <div className="h-full flex flex-col lg:flex-row md:flex-row pt-20 relative px-6">
          {/* Left Section - Vertical Text */}
          <div className="flex flex-col justify-center">
            {/* Large Vertical Text for Larger Screens */}
            <h1
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
              }}
              className="text-transparent font-bold font-outline-2 lg:rotate-180 md:rotate-180 -rotate-90 lg:text-[7rem] md:text-[6rem] text-0"
            >
              AGENT-X
            </h1>
            {/* Small Horizontal Text for Smaller Screens */}
            <h1 className="text-transparent font-bold font-outline-2 lg:text-0 md:text-0 text-[4rem] pt-16">
              AGENT-X
            </h1>
          </div>

          {/* Main Content Section */}
          <div className="z-20 flex flex-col items-start">
            <img src="/images/stars.png" alt="stars" className="h-32" />
            <Parallax speed={-15}>
              <img
                src="/images/astro2.png"
                alt="astro"
                className="absolute lg:h-[13rem] h-[10rem] lg:right-[10rem] md:right-[5rem] right-2 top-[-12rem] z-0"
              />
            </Parallax>
            <h1 className="font-medium mt-4 lg:text-8xl md:text-6xl text-5xl">
              AgentX
            </h1>
            <h1 className="font-medium mt-2 lg:text-8xl md:text-6xl text-5xl text-purple-500">
              Monthly Challenge
            </h1>
            <p className="my-5 text-lg">
              NEW WAY TO <span className="text-purple-500">LEARN</span> SKILLS
            </p>
            <p className="my-10 text-lg max-w-md">
              Fun Filled Competitions to tickle your Coding brain and win
              exclusive prizes by AngelHack.
            </p>
            <div className="flex gap-5">
              <button className="bg-purple-600 px-4 py-1.5 rounded-md text-sm">
                MINT NOW 😎
              </button>
              <button className="border px-4 py-1.5 rounded-md text-sm">
                JOIN US 👁️
              </button>
            </div>
          </div>

          {/* Right Section - Wave Image and Ship */}
          <div className="flex flex-col justify-end relative">
            <img
              style={{ filter: "invert(0.1)" }}
              src="/images/wave.webp"
              alt="wave"
              className="absolute h-24 right-0 top-36"
            />
            <Parallax
              translateX={["-100px", "50px"]}
              translateY={["0px", "-150px"]}
              easing="easeInQuad"
            >
              <img
                src="/images/ship.png"
                alt="space ship"
                className="lg:h-40 md:h-32 h-28 z-0 lg:top-[55%] md:top-[55%]"
              />
            </Parallax>
          </div>
        </div>
      </div>
    </ParallaxBanner>
  );
};

export default Hero;
