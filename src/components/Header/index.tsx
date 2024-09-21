import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Logo } from "../icons";

const ScrollStatus = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement || document.body;
      const percent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPercent(percent);
    };

    // Add event listener to update scroll percentage on scroll
    window.addEventListener("scroll", handleScroll);
    return () => {
      // Clean up the event listener on unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-0.5 w-full">
      <div
        className="h-0.5 bg-purple-500"
        style={{ width: `${scrollPercent}%` }}
      ></div>
    </div>
  );
};

const NavBar = () => {
  const [colorChange, setColorchange] = useState(false);

  const changeNavbarColor = () => {
    if (window.scrollY >= 0) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
    return () => window.removeEventListener("scroll", changeNavbarColor);
  }, []);

  return (
    <div className="fixed inset-0 flex h-16 justify-center z-50">
      <div
        className={`w-4/6 absolute top-8 items-center justify-center rounded-lg ${
          colorChange &&
          "transition-all delay-100 ease-in-out bg-opacity-10 backdrop-blur-md border-gray-800 shadow"
        }`}
      >
        <div className="flex items-center justify-between py-3 m-auto text-lg px-8">
          <div className="flex items-center">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            to="/"
          >
            <Logo />
            <p className="font-bold text-inherit">AGENT X</p>
          </Link>
          </div>

          <div className="flex items-center">
            <Link style={{ textDecoration: "none" }} to="/app">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
            </Link>
          </div>
        </div>

        <ScrollStatus />
      </div>
    </div>
  );
};

export default NavBar;

