import React, { useState, useEffect } from "react";

function Timer({ time, setTime }) {
  useEffect(() => {
    let interval = setInterval(() => setTime((time) => time - 1), 1000);
    return () => clearInterval(interval);
  }, [time]);
  return (
    <span>{`${Math.floor(time / 60)}:${((time % 60) + "").padStart(
      2,
      "0"
    )} minutes`}</span>
  );
}

export default React.memo(Timer)
