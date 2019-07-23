//TODO: STEP 1 - Import the useState hook.
import React from "react";
import "./App.css";
import BottomRow from "./BottomRow";
import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.
  const [home, homeCount] = useState(0);
  const [away, awayCount] = useState(0);
  const [isActive, setActive] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  function toggle() {
    setActive(!isActive);
  }
  function reset() {
    setMinutes(0);
    setSeconds(0);
    setActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
        if (seconds > 60) {
          setMinutes(minutes => minutes + 1)
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    } return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="container">
      <section className="scoreboard">
        <div className="topRow">
          <div className="home">
            <h2 className="home__name">Lions</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className="home__score">{10 + home}</div>
          </div>
          <div className="timer">{minutes}</div>
          <div className="away">
            <h2 className="away__name">Tigers</h2>
            <div className="away__score">{7 + away}</div>
          </div>
        </div>
        <BottomRow />
      </section>
      <section className="buttons">
        <div className="homeButtons">
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          <button className="homeButtons__touchdown" onClick={() => homeCount(home + 7)}>Home Touchdown</button>
          <button className="homeButtons__fieldGoal" onClick={() => homeCount(home + 3)}>Home Field Goal</button>
        </div>
        <div className="awayButtons">
          <button className="awayButtons__touchdown" onClick={() => awayCount(away + 7)}>Away Touchdown</button>
          <button className="awayButtons__fieldGoal" onClick={() => awayCount(away + 3)}>Away Field Goal</button>
        </div>
        <div className="timerButton">
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className="button" onClick={reset}>
          Reset
        </button>
      </div>
      </section>
    </div>


  );

}

export default App;
