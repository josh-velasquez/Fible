import React, { useState, useEffect } from "react";
import { Button, Container, Label, Segment } from "semantic-ui-react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const onStartStopStopwatchClick = () => {
    setIsRunning(!isRunning);
  };

  const onResetStopwatchClick = () => {
    setTime(0);
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center" }}>
      <Segment style={{ width: "400px", backgroundColor: "#8ecae6" }}>
        <Container
          textAlign="center"
          style={{
            backgroundColor: "#fefae0",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Label size="massive" style={{ backgroundColor: "#fefae0" }}>
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}:
            {milliseconds.toString().padStart(2, "0")}
          </Label>
        </Container>
        <Container textAlign="center" style={{ paddingTop: "10px" }}>
          <Button primary onClick={onStartStopStopwatchClick}>
            {isRunning ? "Stop" : "Start"}
          </Button>
          <Button secondary onClick={onResetStopwatchClick}>
            Reset
          </Button>
        </Container>
      </Segment>
    </Container>
  );
};

export default Stopwatch;
