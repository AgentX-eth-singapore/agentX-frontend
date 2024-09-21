import { Link } from "react-router-dom";

const StayInTouch = () => {
  return (
    <div className="flex lg:flex-row md:flex-row flex-col justify-evenly items-center gap-5 gap-y-16 pt-32 w-full px-5">
      {/* Left Section - Title and Button */}
      <div
        data-aos="fade-up"
        className="flex flex-col font-medium gap-3 m-auto lg:w-auto md:w-auto w-[90%] text-center lg:text-left"
      >
        <h3 className="lg:text-7xl md:text-5xl text-5xl">Let&apos;s Stay In</h3>
        <h3 className="flex items-center text-purple-500 gap-3 lg:text-7xl md:text-5xl text-5xl">
          <span>Touch</span>
          <img
            className="lg:flex md:flex hidden"
            src="./images/bird.webp"
            alt="bird"
          />
        </h3>
        <Link to={'https://www.linkedin.com/in/codersadhu/'} className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-10 py-3 rounded-xl mt-6 transition-colors duration-300">
          Explore 😎
        </Link>
      </div>

      {/* Right Section - Image and Contact Info */}
      <div className="lg:max-w-xl md:max-w-lg w-[90%] m-auto flex flex-col items-end lg:text-right md:text-right text-left">
        <img
          data-aos="fade-up"
          src="./images/stayintouch.png"
          className="rounded-lg shadow-lg"
          alt="stay in touch"
        />
        <h2
          data-aos="fade-up"
          className="text-gray-300 text-2xl font-medium my-6"
        >
          AgentX Team, ETH Singapore
        </h2>
        <h4 data-aos="fade-up" className="text-gray-500">
          dipanshuraz2@gmail.com
        </h4>
        <h4 data-aos="fade-up" className="text-gray-500 mt-3">
          +91 8299379285
        </h4>
      </div>
    </div>
  );
};

export default StayInTouch;
