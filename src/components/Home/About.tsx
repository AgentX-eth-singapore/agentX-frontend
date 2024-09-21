import { Parallax } from "react-scroll-parallax";

type HighlightProps = {
  text: string;
};

const Highlight: React.FC<HighlightProps> = ({ text }) => (
  <p className="text-gray-700">✨ {text}</p>
);

const About = () => {
  const highlights = [
    "3D Web3 Interfaces",
    "Web3 Integration",
    "User Experience",
    "Code-elegance",
  ];

  return (
    <div
      id="about"
      className="flex lg:flex-row md:flex-row flex-col items-center justify-evenly py-16 lg:gap-5 md:gap-5 gap-16"
    >
      {/* Left Section: Description and Button */}
      <div>
        <img src="./images/wave-pattern.webp" className="h-7" alt="wave" />
        <h3 className="text-4xl font-semibold underline-offset-8 mt-4">
          <span className="text-purple-500">June</span> Challenge
        </h3>
        <p className="text-gray-500 max-w-sm my-10">
          The theme for this month is “Web3 Application Interface / Front-end”.
          It's time to showcase your skills in building intuitive, interactive,
          and visually stunning interfaces for web3 applications. The challenge
          has two tracks - Design & Code
        </p>
        <button className="bg-purple-600 px-8 py-2 rounded-md text-sm">
          Explore 😎
        </button>
      </div>

      {/* Center Section: Parallax Image */}
      <Parallax speed={-5}>
        <div>
          <img src="/images/letter-d.png" className="px-5" alt="profile pic" />
        </div>
      </Parallax>

      {/* Right Section: Highlights */}
      <div className="flex flex-col gap-5 font-medium text-lg">
        {highlights.map((highlight, index) => (
          <Highlight key={index} text={highlight} />
        ))}
      </div>
    </div>
  );
};

export default About;
