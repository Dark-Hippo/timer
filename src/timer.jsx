import { useEffect, useState } from 'react';

const Timer = () => {
  const startTime = 5;
  const [timer, setTimer] = useState(startTime);

  useEffect(() => {
    const runningTimer = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearTimeout(runningTimer);
  }, [timer]);

  return (
    <>
      {timer}
      <br />
      <button
        onClick={() => {
          setTimer(startTime);
        }}
      >
        Reset
      </button>
    </>
  );
};

export default Timer;
