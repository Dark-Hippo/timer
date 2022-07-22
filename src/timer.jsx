import { useEffect, useState } from 'react';

const Timer = ({ duration }) => {
  const startTime = duration;
  const step = 1;
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
        setTimer(timer - step);
      }
    }, step * 1000);

    return () => clearTimeout(runningTimer);
  }, [timer]);

  const resetTimer = () => {
    setState(STATE.RUNNING);
    setTimer(startTime);
  };

  const pauseButtonClicked = () => {
    if (state === STATE.RUNNING) {
      pauseTimer();
    } else {
      resumeTimer();
    }
  };

  const pauseTimer = () => {
    setState(STATE.PAUSED);
    setRemainingTime(timer);
    setTimer(0);
  };

  const resumeTimer = () => {
    setState(STATE.RUNNING);
    setTimer(remainingTime);
    setRemainingTime(0);
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
      <button
        onClick={pauseButtonClicked}
        style={{ display: state === STATE.STOPPED ? 'none' : 'flex' }}
      >
        {state === STATE.RUNNING ? 'Pause' : 'Resume'}
      </button>
      <h2>{state.toString()}</h2>
    </>
  );
};

export default Timer;
