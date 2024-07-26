import React, { useState, useEffect, useRef } from 'react';
import './Scoreboard.css';
import './ScoreboardController.css';

const Scoreboard = ({ teamAName, teamBName, scoreA, scoreB, timeLeft, quarter, shotClock, timeoutsA, timeoutsB, teamALogo, teamBLogo, barLogo }) => {
  return (
    <div className="scoreboard">
      <div className="team team-a houston">
        <div className="team-logo">
          <img src={teamALogo} alt="Team A Logo" width="60px" height="60px" />
        </div>
        <div className="team-detail">
          <div className="team-nameandscore">
            <div className="team-name">
              {teamAName}
            </div>
            <div className="team-score">
              {scoreA}
            </div>
          </div>
          <div className="team-thisgame">
            <div className="team-times">
              TO: {timeoutsA}
            </div>
            <div className="team-bonus">
              PUNTOS
            </div>
          </div>
        </div>
      </div>
      <div className="team team-b dallas">
        <div className="team-logo">
          <img src={teamBLogo} alt="Team B Logo" width="60px" height="60px" />
        </div>
        <div className="team-detail">
          <div className="team-nameandscore">
            <div className="team-name">
              {teamBName}
            </div>
            <div className="team-score">
              {scoreB}
            </div>
          </div>
          <div className="team-thisgame">
            <div className="team-times">
              TO: {timeoutsB}
            </div>
            <div className="team-bonus">
              PUNTOS
            </div>
          </div>
        </div>
      </div>
      <div className="timer">
        <div className="timer-container">
          <div className="quarter">
            {quarter}
          </div>
          <div className="timeleft">
            {timeLeft}
          </div>
          <div className="shotclock">
            {shotClock}
          </div>
        </div>
      </div>
      <div className="logo">
        <img src={barLogo} alt="Bar Logo" />
      </div>
    </div>
  );
};

const ScoreboardController = () => {
  const [teamAName, setTeamAName] = useState('TEAM A  10');
  const [teamBName, setTeamBName] = useState('TEAM B  10');
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [timeLeft, setTimeLeft] = useState('10:00');
  const [quarter, setQuarter] = useState('1er');
  const [shotClock, setShotClock] = useState(24);
  const [timeoutsA, setTimeoutsA] = useState(4);
  const [timeoutsB, setTimeoutsB] = useState(4);
  const [teamALogo, setTeamALogo] = useState('https://previews.123rf.com/images/boordon/boordon1802/boordon180200290/95191747-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-1-arriba-de-la-canasta-logotipo-deportivo.jpg');
  const [teamBLogo, setTeamBLogo] = useState('https://previews.123rf.com/images/boordon/boordon1802/boordon180200318/95191887-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-2-arriba-de-la-canasta-logotipo-deportivo.jpg');
  const [barLogo, setBarLogo] = useState('public/344550679_485629013704610_657721024745829251_n.png');
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState('10:00');

  const gameTimerRef = useRef(null);
  const shotClockTimerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      gameTimerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const [minutes, seconds] = prevTime.split(':').map(Number);
          const totalSeconds = minutes * 60 + seconds - 1;
          if (totalSeconds <= 0) {
            clearInterval(gameTimerRef.current);
            return '00:00';
          }
          const newMinutes = Math.floor(totalSeconds / 60);
          const newSeconds = totalSeconds % 60;
          return `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        });
      }, 1000);

      shotClockTimerRef.current = setInterval(() => {
        setShotClock((prevShotClock) => {
          const newShotClock = prevShotClock - 1;
          if (newShotClock <= 0) {
            return 24;
          }
          return newShotClock;
        });
      }, 1000);
    } else {
      clearInterval(gameTimerRef.current);
      clearInterval(shotClockTimerRef.current);
    }
    return () => {
      clearInterval(gameTimerRef.current);
      clearInterval(shotClockTimerRef.current);
    };
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handleStop = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialTime);
    setShotClock(24);
    setScoreA(0);
    setScoreB(0);
    setTeamAName('');
    setTeamBName('');
    setTeamALogo('https://previews.123rf.com/images/boordon/boordon1802/boordon180200290/95191747-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-1-arriba-de-la-canasta-logotipo-deportivo.jpg');
    setTeamBLogo('https://previews.123rf.com/images/boordon/boordon1802/boordon180200318/95191887-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-2-arriba-de-la-canasta-logotipo-deportivo.jpg');
    setBarLogo('public/344550679_485629013704610_657721024745829251_n.png');
  };

  const resetShotClock = () => setShotClock(24);

  const updateScoreA = (increment) => setScoreA((prevScore) => Math.max(0, prevScore + increment));
  const updateScoreB = (increment) => setScoreB((prevScore) => Math.max(0, prevScore + increment));
  const updateTimeoutsA = (decrement) => setTimeoutsA((prevTimeouts) => Math.max(0, prevTimeouts + decrement));
  const updateTimeoutsB = (decrement) => setTimeoutsB((prevTimeouts) => Math.max(0, prevTimeouts + decrement));
  const updateQuarter = (newQuarter) => setQuarter(newQuarter);
  const updateInitialTime = (event) => {
    setInitialTime(event.target.value);
    setTimeLeft(event.target.value);
  };

  const updateTeamAName = (event) => {
    const newName = event.target.value.toUpperCase();
    if (newName.length <= 9) {
      setTeamAName(newName);
    }
  };
  const updateTeamBName = (event) => {
    const newName = event.target.value.toUpperCase();
    if (newName.length <= 9) {
      setTeamBName(newName);
    }
  };

  const handleLogoUpload = (event, setLogo) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="scoreboard-controller">
      <Scoreboard
        teamAName={teamAName}
        teamBName={teamBName}
        scoreA={scoreA}
        scoreB={scoreB}
        timeLeft={timeLeft}
        quarter={quarter}
        shotClock={shotClock}
        timeoutsA={timeoutsA}
        timeoutsB={timeoutsB}
        teamALogo={teamALogo}
        teamBLogo={teamBLogo}
        barLogo={barLogo}
      />
      <div className="controls">
        <div className="controls-container">
          <div className="team-controls">
            <div className="team-controls-section">
              <h3>Control del Equipo A</h3>
              <label>
                Nombre del Equipo A:
                <input type="text" value={teamAName} onChange={updateTeamAName} />
              </label>
              <label>
                Logo del Equipo A:
                <input type="file" accept="image/*" onChange={(event) => handleLogoUpload(event, setTeamALogo)} />
              </label>
              <label>
                Puntuación:
                <div>
                  <button onClick={() => updateScoreA(1)}>+1</button>
                  <button onClick={() => updateScoreA(2)}>+2</button>
                  <button onClick={() => updateScoreA(3)}>+3</button>
                  <button onClick={() => updateScoreA(-1)}>-1</button>
                </div>
              </label>
              <label>
                Tiempos fuera:
                <div>
                  <button onClick={() => updateTimeoutsA(1)}>+1</button>
                  <button onClick={() => updateTimeoutsA(-1)}>-1</button>
                </div>
              </label>
            </div>
          </div>
          <div className="team-controls">
            <div className="team-controls-section">
              <h3>Control del Equipo B</h3>
              <label>
                Nombre del Equipo B:
                <input type="text" value={teamBName} onChange={updateTeamBName} />
              </label>
              <label>
                Logo del Equipo B:
                <input type="file" accept="image/*" onChange={(event) => handleLogoUpload(event, setTeamBLogo)} />
              </label>
              <label>
                Puntuación:
                <div>
                  <button onClick={() => updateScoreB(1)}>+1</button>
                  <button onClick={() => updateScoreB(2)}>+2</button>
                  <button onClick={() => updateScoreB(3)}>+3</button>
                  <button onClick={() => updateScoreB(-1)}>-1</button>
                </div>
              </label>
              <label>
                Tiempos fuera:
                <div>
                  <button onClick={() => updateTimeoutsB(1)}>+1</button>
                  <button onClick={() => updateTimeoutsB(-1)}>-1</button>
                </div>
              </label>
            </div>
          </div>
          <div className="general-controls">
            <div className="general-controls-section">
              <label>
                Tiempo del Juego:
                <input type="text" value={initialTime} onChange={updateInitialTime} />
              </label>
              <label>
                Periodo:
                <select value={quarter} onChange={(e) => updateQuarter(e.target.value)}>
                  <option value="1st">1º</option>
                  <option value="2nd">2º</option>
                  <option value="3rd">3º</option>
                  <option value="4th">4º</option>
                </select>
              </label>
              <label>
                Logo del Bar:
                <input type="file" accept="image/*" onChange={(event) => handleLogoUpload(event, setBarLogo)} />
              </label>
              <button onClick={handleStart}>Iniciar</button>
              <button onClick={handleStop}>Detener</button>
              <button onClick={handleReset}>Reiniciar</button>
            </div>
            <div className="general-controls-section">
              <button onClick={resetShotClock}>Reiniciar Tiempo de Tiro</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreboardController;
