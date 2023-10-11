import { useEffect, useState } from "react";
import { Button, Container, Segment } from "semantic-ui-react";

interface TimerProps {
  startTime: number;
  timerDiameter: number;
}
const Timer: React.FC<TimerProps> = ({ startTime, timerDiameter }) => {
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;
  const COLOR_CODES = {
    default: {
      color: "grey",
    },
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
  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [time, setTime] = useState<number>(startTime);
  const [timerColor, setTimerColor] = useState<string>(COLOR_CODES.info.color);
  const [dashStroke, setDashStroke] = useState<string>("283 283");
  const [alertInterval, setAlertInterval] = useState<number | null>(null);

  const formatTime = (timer: number) => {
    const hours = Math.floor(timer / 3600);
    const remainingSeconds = timer % 3600;
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;
    if (timer > 3600) {
      return `${hours}:${minutes}:${seconds.toString().padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }
  };

  const onStartPauseTimerClick = () => {
    setStartTimer((prevStartTimer) => !prevStartTimer);
  };

  useEffect(() => {
    if (time === 0) {
      setTimerColor(COLOR_CODES.default.color);
    } else if (time <= COLOR_CODES.alert.threshold) {
      setTimerColor(COLOR_CODES.alert.color);
    } else if (time <= COLOR_CODES.warning.threshold) {
      setTimerColor(COLOR_CODES.warning.color);
    } else {
      setTimerColor(COLOR_CODES.info.color);
    }
  }, [time]);

  useEffect(() => {
    const timeFraction = time / startTime;
    const rawTimeFraction = timeFraction - (1 / startTime) * (1 - timeFraction);
    const newDashStroke = `${(rawTimeFraction * 283).toFixed(0)} 283`;
    setDashStroke(newDashStroke);
  }, [time, startTime]);

  useEffect(() => {
    if (startTimer) {
      if (time === 0) {
        setTimerColor(COLOR_CODES.default.color);
        if (!alertInterval) {
          const newAlertInterval = setInterval(() => {
            alert("TIME'S UP!");
            clearInterval(newAlertInterval);
            setAlertInterval(null);
            setStartTimer(false);
            setTime(startTime);
          }, 500);
        } else {
          clearInterval(alertInterval);
          setAlertInterval(null);
        }
      } else {
        if (alertInterval) {
          clearInterval(alertInterval);
          setAlertInterval(null);
        }

        const timerInterval = setInterval(() => {
          setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => {
          clearInterval(timerInterval);
        };
      }
    }
  }, [startTimer, startTime, time, alertInterval]);

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Segment style={{ backgroundColor: "#8ecae6" }}>
        <Container
          textAlign="center"
          style={{
            backgroundColor: "#fefae0",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            className="base-timer"
            style={{
              height: `${timerDiameter}px`,
              width: `${timerDiameter}px`,
            }}
          >
            <svg
              className="base-timer__svg"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g className="base-timer__circle">
                <circle
                  className="base-timer__path-elapsed"
                  cx="50"
                  cy="50"
                  r="45"
                />
                <path
                  className={`base-timer__path-remaining`}
                  strokeDasharray={dashStroke}
                  stroke={timerColor}
                  d="M 50, 50 m -45, 0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
                ></path>
              </g>
            </svg>
            <span
              className="base-timer__label"
              style={{
                height: `${timerDiameter}px`,
                width: `${timerDiameter}px`,
                fontSize: `${timerDiameter / 5}px`,
              }}
            >
              {formatTime(time)}
            </span>
          </div>
        </Container>
        <Container textAlign="center" style={{ paddingTop: "10px" }}>
          <Button primary onClick={onStartPauseTimerClick}>
            {startTimer ? "Pause" : "Start"}
          </Button>
        </Container>
      </Segment>
    </Container>
  );
};

export default Timer;
