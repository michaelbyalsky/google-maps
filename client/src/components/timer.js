import React, { useState, useEffect } from "react";

export default function Timer({ time, setTime }) {
  useEffect(() => {
    setInterval(() => setTime((time) => time - 1), 1000);
  }, []);
  return (
    <span>{`${Math.floor(time / 60)}:${((time % 60) + "").padStart(
      2,
      "0"
    )} minutes`}</span>
  );
}
