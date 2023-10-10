import { useEffect, useState } from "react";

interface TimerProps {
  startTime: string;
}
const Timer: React.FC<TimerProps> = ({ startTime }) => {
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;
  const COLOR_CODES = {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  };
  const [time, setTime] = useState(startTime);
  const [timerColor, setTimerColor] = useState<string>(COLOR_CODES.info.color);

  useEffect(() => {
    // https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
  }, [time]);

  useEffect(() => {
    setInterval(() => {
      setTime((prevTime) => {
        const time = prevTime.split(":");
        const minutes = parseInt(time[0]);
        const seconds = parseInt(time[1]);
        if (seconds === 0) {
          if (minutes === 0) {
            return prevTime;
          } else {
            return `${minutes - 1}:59`;
          }
        } else {
          return `${minutes}:${seconds - 1}`;
        }
      });
    });
  }, [time]);

  const formatTime = (timeStr: string) => {
    const time = parseInt(timeStr);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };
  return (
    <div className="base-timer">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45" />
          <path
            className={`base-timer__path-remaining ${timerColor}`}
            strokeDasharray={283}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          ></path>
        </g>
      </svg>
      <span className="base-timer__label">{formatTime(time)}</span>
    </div>
  );
};

export default Timer;
