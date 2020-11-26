import { set } from "date-fns";
import React, { useState, useEffect } from "react";

export default function Timer({ time, setTime, setGameStart }) {
  if (time === 0){
    alert('you lost')
    setTime(60);
    setGameStart(null)
  }
  useEffect(() => {
    const interval = setInterval(() => setTime((time) => time - 1), 1000);
    return () => clearInterval(interval)
  }, []);
  return (
    <span>{`${Math.floor(time / 60)}:${((time % 60) + "").padStart(
      2,
      "0"
    )} minutes`}</span>
  );
}
