import { Parallax } from "react-scroll-parallax";
import { useMemo, useState, useEffect } from "react";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = () => {
  // Load the saved end time from localStorage, or set to 8 hours from now if not found
  const savedEndTime = localStorage.getItem("endTime");
  const initialEndTime = savedEndTime ? parseInt(savedEndTime, 10) : Date.now() + 8 * HOUR;

  // Initialize the state with the time difference between the end time and now
  const [endTime, _setEndTime] = useState(initialEndTime);
  const [time, setTime] = useState(endTime - Date.now());

  useEffect(() => {
    // Save the current end time to localStorage to persist it
    localStorage.setItem("endTime", endTime.toString());

    const interval = setInterval(() => {
      const remainingTime = endTime - Date.now();
      setTime(remainingTime);

      // Stop the timer and remove the end time from storage if time runs out
      if (remainingTime <= 0) {
        clearInterval(interval);
        localStorage.removeItem("endTime");
        setTime(0); // Set time to 0 explicitly when the timer ends
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  const timeUnits = useMemo(
    () => ({
      DAYS: Math.max(0, Math.floor(time / DAY)),
      HOURS: Math.max(0, Math.floor((time / HOUR) % 24)),
      MINUTES: Math.max(0, Math.floor((time / MINUTE) % 60)),
      SECONDS: Math.max(0, Math.floor((time / SECOND) % 60)),
    }),
    [time]
  );

  return (
    <div>
      <div className="lg:text-6xl md:text-5xl text-3xl font-medium flex flex-col gap-10 items-center justify-center w-full">
        <div className="flex justify-evenly w-full">
          <div className="text-purple-500 lg:text-5xl">ETH Singapore Challenge</div>
          <Parallax speed={-5} easing="easeInQuad">
            <img src="./images/robot.png" className="lg:h-32 md:h-32 h-20" alt="robot" />
          </Parallax>
        </div>
        <div className="flex items-center">
          <Parallax translateX={["0px", "-100px"]} translateY={["0px", "100px"]} scale={[1, 1.5]} easing="easeInQuad">
            <img src="./images/rocket.webp" className="h-32" alt="rocket" />
          </Parallax>
          <div>Launching Soon</div>
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
