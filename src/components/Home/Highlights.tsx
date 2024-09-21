import { Parallax } from "react-scroll-parallax";
import CountUp from "react-countup";

const HighlightItem = ({ count, label } : {
  count: number;
  label: string;
}) => (
  <div className="flex gap-2">
    <div>
      <Parallax rotate={[-180, 0]} easing="easeInQuad">
        <img src="./images/staranim.png" className="lg:h-20 md:h-20 h-16" alt="star" />
      </Parallax>
    </div>
    <div className="text-center">
      <p className="lg:text-5xl text-4xl font-bold lg:w-32 md:w-32 w-28">
        <CountUp end={count} enableScrollSpy={true} />+
      </p>
      <p className="text-purple-500 lg:text-lg md:text-lg text-base pt-3">{label}</p>
    </div>
  </div>
);

const Highlights = () => {
  const highlightData = [
    { count: 4, label: "Monthly Challenge" },
    { count: 10, label: "Exciting Themes" },
    { count: 150, label: "Hackers Participated" },
    { count: 12, label: "Challenge Winners" },
  ];

  return (
    <div className="bg-white relative py-10">
      <img
        style={{ filter: "invert(0.2)" }}
        src="./images/wave.webp"
        alt="wave"
        className="lg:h-22 md:h-18 h-12"
      />
      <div className="flex flex-wrap justify-evenly lg:gap-10 md:gap-10 gap-5 gap-y-16 py-16">
        {highlightData.map((item, index) => (
          <HighlightItem key={index} count={item.count} label={item.label} />
        ))}
      </div>
    </div>
  );
};

export default Highlights;
