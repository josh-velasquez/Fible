import { useEffect, useState } from "react";

interface TimerProps {
  startTime: number;
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
  const [time, setTime] = useState<number>(startTime);
  const [timerColor, setTimerColor] = useState<string>(COLOR_CODES.info.color);
  const [dashStroke, setDashStroke] = useState<string>("283 283");

  useEffect(() => {
    if (time <= COLOR_CODES.alert.threshold) {
      setTimerColor(COLOR_CODES.alert.color);
    } else if (time <= COLOR_CODES.warning.threshold) {
      setTimerColor(COLOR_CODES.warning.color);
    } else {
      setTimerColor(COLOR_CODES.info.color);
    }
  }, [time]);

  useEffect(() => {
    // https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
    const timeFraction = time / startTime;
    const rawTimeFraction = timeFraction - (1 / startTime) * (1 - timeFraction);
    const dashStroke = `${(rawTimeFraction * 283).toFixed(0)} 283`;
    setDashStroke(dashStroke);
  }, [time, startTime]);

  useEffect(() => {
    setInterval(() => {
      setTime((time) => (time > 0 ? time - 1 : 0));
    }, 1000);
  }, []);

  useEffect(() => {
    if (time === 0) {
      alert("Time's up!");
    }
  }, [time]);

  const formatTime = (timer: number) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
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
            className={`base-timer__path-remaining`}
            strokeDasharray={dashStroke}
            stroke={timerColor}
            d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
          ></path>
        </g>
      </svg>
      <span className="base-timer__label">{formatTime(time)}</span>
    </div>
  );
};

export default Timer;
