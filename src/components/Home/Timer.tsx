import { Parallax } from "react-scroll-parallax";
import { useMemo, useState, useEffect } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = () => {
  const selectedDate = "June 30, 2023";
  const parsedDeadline = useMemo(() => Date.parse(selectedDate), [selectedDate]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(parsedDeadline - Date.now()), 1000);
    return () => clearInterval(interval);
  }, [parsedDeadline]);

  const timeUnits = {
    DAYS: Math.max(0, Math.floor(time / DAY)),
    HOURS: Math.max(0, Math.floor((time / HOUR) % 24)),
    MINUTES: Math.max(0, Math.floor((time / MINUTE) % 60)),
    SECONDS: Math.max(0, Math.floor((time / SECOND) % 60)),
  };

  return (
    <div>
      <div className="lg:text-6xl md:text-5xl text-3xl font-medium flex flex-col gap-10 items-center justify-center w-full">
        <div className="flex justify-evenly w-full">
          <div className="text-purple-500">June Challenge</div>
          <Parallax speed={-5} easing="easeInQuad">
            <img src="./images/robot.png" className="lg:h-32 md:h-32 h-20" alt="robot" />
          </Parallax>
        </div>
        <div className="flex items-center">
          <Parallax translateX={["0px", "-100px"]} translateY={["0px", "100px"]} scale={[1, 1.5]} easing="easeInQuad">
            <img src="./images/rocket.webp" className="h-32" alt="rocket" />
          </Parallax>
          <div>Ending Soon</div>
        </div>
      </div>

      <div className="flex justify-center items-center lg:gap-8 md:gap-7 gap-2 my-16">
        {Object.entries(timeUnits).map(([label, value], idx, array) => (
          <div key={label} className="flex lg:gap-5 md:gap-5 gap-2 items-center">
            <div className="text-center">
              <h2
                className={`lg:text-[7rem] md:text-[5rem] text-[3rem] text-transparent font-bold ${
                  idx === 0 ? "font-outline-4-green" : "font-outline-4-purple"
                }`}
              >
                {`${value}`.padStart(2, "0")}
              </h2>
              <div className="font-medium lg:text-xl md:text-xl text-base">{label}</div>
            </div>
            {idx < array.length - 1 && (
              <div className="flex flex-col items-center justify-center">
                <div className="w-2 h-2 bg-gray-300"></div>
                <div className="w-2 h-2 bg-gray-300"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timer;
