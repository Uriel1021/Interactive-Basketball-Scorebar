import React, { useState, useEffect, useRef } from 'react';
import Scoreboard from './Scoreboard';
import './ScoreboardController.css';


const ScoreboardController = () => {
    const [teamAName, setTeamAName] = useState('TEAM A  10');
    const [tempTeamAName, setTempTeamAName] = useState('');
    const [teamBName, setTeamBName] = useState('TEAM B  10');
    const [tempTeamBName, setTempTeamBName] = useState('');
    const [scoreA, setScoreA] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [timeLeft, setTimeLeft] = useState('10:00');
    const [quarter, setQuarter] = useState('1er');
    const [shotClock, setShotClock] = useState(24);
    const [timeoutsA, setTimeoutsA] = useState(4);
    const [timeoutsB, setTimeoutsB] = useState(4);
    const [teamALogo, setTeamALogo] = useState('https://previews.123rf.com/images/boordon/boordon1802/boordon180200290/95191747-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-1-arriba-de-la-canasta-logotipo-deportivo.jpg');
    const [teamBLogo, setTeamBLogo] = useState('https://previews.123rf.com/images/boordon/boordon1802/boordon180200318/95191887-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-2-arriba-de-la-canasta-logotipo-deportivo.jpg');
    const [barLogo, setBarLogo] = useState('344550679_485629013704610_657721024745829251_n.png');
    const [isRunning, setIsRunning] = useState(false);
    const [initialTime, setInitialTime] = useState('10:00');
    const [teamAColor, setTeamAColor] = useState('#FF0000');
    const [teamBColor, setTeamBColor] = useState('#0000FF');
    const [isTeamAImage, setIsTeamAImage] = useState(true);
    const [isTeamBImage, setIsTeamBImage] = useState(true);
    const [teamAImageColor, setTeamAImageColor] = useState('#FF0000');
    const [teamBImageColor, setTeamBImageColor] = useState('#0000FF');
  
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

    const handleColorChangeA = (e) => setTeamAShirtColor(e.target.value);
    const handleColorChangeB = (e) => setTeamBShirtColor(e.target.value);
  
    const handleStart = () => setIsRunning(true);
    const handleStop = () => setIsRunning(false);
    const handleReset = () => {
      setIsRunning(false);
      setTimeLeft(initialTime);
      setShotClock(24);
      setScoreA(0);
      setScoreB(0);
      setTeamAName('TEAM A 10');
      setTeamBName('TEAM B 10');
      setTeamAColor('#FF0000');
      setTeamBColor('#0000FF');
      setTeamALogo('https://previews.123rf.com/images/boordon/boordon1802/boordon180200290/95191747-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-1-arriba-de-la-canasta-logotipo-deportivo.jpg');
      setTeamBLogo('https://previews.123rf.com/images/boordon/boordon1802/boordon180200318/95191887-dos-manos-sostienen-la-pelota-de-baloncesto-con-el-n%C3%BAmero-2-arriba-de-la-canasta-logotipo-deportivo.jpg');
      setBarLogo('344550679_485629013704610_657721024745829251_n.png');
      setTimeoutsA(4);
      setTimeoutsB(4);
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
  
    const updateTempTeamAName = (event) => {
      const newName = event.target.value.toUpperCase();
      if (newName.length <= 9) {
        setTempTeamAName(newName);
      }
    };

    const applyTeamANameChange = () => {
      setTeamAName(tempTeamAName);
    };

    const updateTempTeamBName = (event) => {
      const newName = event.target.value.toUpperCase();
      if (newName.length <= 9) {
        setTempTeamBName(newName);
      }
    };

    const applyTeamBNameChange = () => {
      setTeamBName(tempTeamBName);
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
          teamAColor={teamAColor}
          teamBColor={teamBColor}
          isTeamAImage={isTeamAImage}
          isTeamBImage={isTeamBImage}
          teamAImageColor={teamAImageColor}
          teamBImageColor={teamBImageColor}
        />
        <div className="controls">
          <div className="controls-container">

            <div className='team-controls'>
              <div className='team-controls-section'>
                <h3>Configuracion del equipo A</h3>
                <label>
                  Nombre del Equipo A:
                  <input type="text" value={tempTeamAName} onChange={updateTempTeamAName} />
                </label>
                <div className='button-container'>
                  <button onClick={applyTeamANameChange}>Cambiar Nombre</button>
                </div>
                <label>
                  Color del equipo A:
                  <input type="color" value={teamAColor} onChange={(e) => setTeamAColor(e.target.value)} />
                </label>
                <label>
                  <label>
                    Que desea mostrar en equipo A:
                  </label>
                  <label>
                    Usar imagen:
                    <input
                      type="radio"
                      checked={isTeamAImage}
                      onChange={() => setIsTeamAImage(true)}
                    />
                  </label>
                  <label>
                    Usar logo:
                    <input
                      type="radio"
                      checked={!isTeamAImage}
                      onChange={() => setIsTeamAImage(false)}
                    />
                  </label>
                </label>
                {!isTeamAImage && (
                  <label>
                    Color de camiseta del Equipo A:
                    <input type="color" value={teamAImageColor} onChange={(e) => setTeamAImageColor(e.target.value)} />
                  </label>
                )}
                {isTeamAImage &&(
                  <label>
                    Seleccione una imagen: 
                    <input type="file" accept="image/*" onChange={(event) => handleLogoUpload(event, setTeamALogo)} />
                  </label>
                )}
              </div>
            </div>
            


            <div className='team-controls'>
              <div className='team-controls-section'>
                <h3>Configuracion del equipo B</h3>
                <label>
                  Nombre del Equipo B:
                  <input type="text" value={tempTeamBName} onChange={updateTempTeamBName} />
                </label>
                <div className='button-container'>
                <button onClick={applyTeamBNameChange}>Cambiar Nombre</button>
                </div>
                <label>
                  Color del equipo B:
                  <input type="color" value={teamBColor} onChange={(e) => setTeamBColor(e.target.value)} />
                </label>
                <label>
                <label>
                    Que desea mostrar en equipo A:
                  </label>
                  <label>
                    Usar imagen:
                    <input
                      type="radio"
                      checked={isTeamBImage}
                      onChange={() => setIsTeamBImage(true)}
                    />
                  </label>
                  <label>
                    Usar logo:
                    <input
                      type="radio"
                      checked={!isTeamBImage}
                      onChange={() => setIsTeamBImage(false)}
                    />
                  </label>
                </label>
                {!isTeamBImage && (
                  <label>
                    Color del logo del Equipo B:
                    <input type="color" value={teamBImageColor} onChange={(e) => setTeamBImageColor(e.target.value)} />
                  </label>
                )}
                {isTeamBImage &&(
                  <label>
                    Seleccione una imagen: 
                    <input type="file" accept="image/*" onChange={(event) => handleLogoUpload(event, setTeamBLogo)} />
                  </label>
                )}
              </div>
            </div>


            <div className="team-controls">
              <div className="team-controls-section">
                <h3>Control del Equipo A</h3>
                <label>
                  Puntuación:
                  <div className='button-container'>
                    <button onClick={() => updateScoreA(1)}>+1</button>
                    <button onClick={() => updateScoreA(2)}>+2</button>
                    <button onClick={() => updateScoreA(3)}>+3</button>
                    <button onClick={() => updateScoreA(-1)}>-1</button>
                  </div>
                </label>
                <label>
                  Tiempos fuera:
                  <div className='button-container'>
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
                  Puntuación:
                  <div className='button-container'>
                    <button onClick={() => updateScoreB(1)}>+1</button>
                    <button onClick={() => updateScoreB(2)}>+2</button>
                    <button onClick={() => updateScoreB(3)}>+3</button>
                    <button onClick={() => updateScoreB(-1)}>-1</button>
                  </div>
                </label>
                <label>
                  Tiempos fuera:
                  <div className='button-container'>
                    <button onClick={() => updateTimeoutsB(1)}>+1</button>
                    <button onClick={() => updateTimeoutsB(-1)}>-1</button>
                  </div>
                </label>
              </div>
            </div>


            <div className="team-controls">
              <div className="team-controls-section">
                <h3>Control del partido</h3>
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
                <div className='button-container'>
                  <button onClick={handleStart}>Iniciar</button>
                  <button onClick={handleStop}>Detener</button>
                  <button onClick={handleReset}>Reiniciar</button>
                  <button onClick={resetShotClock}>Reiniciar Tiempo de Tiro</button>
                </div>
                <label>
                  Logo del Bar:
                  <input type="file" accept="image/*" onChange={(event) => handleLogoUpload(event, setBarLogo)} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default ScoreboardController;
  