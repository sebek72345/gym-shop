import React, { useState, useEffect } from "react";

export default function CountDown() {
  let [seconds, setSeconds] = useState(3);
  let [minutes, setMinutes] = useState(59);
  let [hours, setHours] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounddownTimer();
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, minutes, hours]);
  const setCounddownTimer = () => {
    if (hours === 0 && minutes == 0 && seconds === 0) {
      timerReset();
    } else if (minutes === 0 && seconds === 0) {
      console.log({ seconds, minutes, hours });
      setHours(--hours);
      setMinutes(59);
      setSeconds(59);
    } else if (seconds === 0) {
      setSeconds(59);
      setMinutes(--minutes);
    } else {
      setSeconds(--seconds);
    }
  };
  const timerReset = () => {
    setSeconds(59);
    setMinutes(59);
    setHours(3);
  };
  const addLeadingZero = (number) => {
    return number < 10 ? "0" + number : number;
  };
  const style = {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "32px",
    color: "#cf0000",
  };
  return (
    <div style={style}>
      {addLeadingZero(hours)}:{addLeadingZero(minutes)}:
      {addLeadingZero(seconds)}
    </div>
  );
}
