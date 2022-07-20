import { useEffect, useState } from 'react';

const Timer = () => {
  const startTime = 5;
  const STATE = {
    RUNNING: 'running',
    PAUSED: 'paused',
    STOPPED: 'stopped',
  };

  const [timer, setTimer] = useState(startTime);
  const [remainingTime, setRemainingTime] = useState(0);
  const [state, setState] = useState(STATE.RUNNING);

  useEffect(() => {
    const runningTimer = setTimeout(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      }
    }, 1000);

    return () => clearTimeout(runningTimer);
  }, [timer]);

  const resetTimer = () => {
    setState(STATE.RUNNING);
    setTimer(startTime);
  };

  const pauseTimer = () => {
    setState(STATE.PAUSED);
    setRemainingTime(timer);
    setTimer(0);
  };

  const timerDisplay = () => {
    if (state === STATE.RUNNING || state === STATE.STOPPED) {
      return timer;
    } else if (state === STATE.PAUSED) {
      return remainingTime;
    }
  };

  return (
    <>
      {timerDisplay()}
      <br />
      <button onClick={resetTimer}>Reset</button>
      <button onClick={pauseTimer} style={{ display: state === STATE.STOPPED ? 'none' : 'flex' }}>
        {state === STATE.RUNNING ? 'Pause' : 'Resume'}
      </button>
      <h2>{state.toString()}</h2>
    </>
  );
};

export default Timer;
