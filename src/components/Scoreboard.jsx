import React, { useState, useEffect, useRef } from 'react';
import './Scoreboard.css';
import './ScoreboardController.css';

const Scoreboard = ({ teamAName, teamBName, scoreA, scoreB, timeLeft, quarter, shotClock, timeoutsA, timeoutsB, teamALogo, teamBLogo, barLogo, teamAColor, teamBColor, isTeamAImage, isTeamBImage, teamAImageColor, teamBImageColor }) => {
  
  const getMetallicGradient = (color) => {
    return `linear-gradient(-2deg, ${color}, #8d918f)`;
  };

  const renderTeamLogo = (logo, isImage, color) => {
    if (isImage) {
      return <img src={logo} alt="Team Logo" width="60px" height="60px" />;
    } else {
      return (
        <div className="team-logo-css" style={{ backgroundColor: color }}></div>
      );
    }
  };
  
  return (
    <div className="scoreboard">
      <div className="team" style={{ background: getMetallicGradient(teamAColor) }}>
        <div className="team-logo">
          {renderTeamLogo(teamALogo, isTeamAImage, teamAImageColor)}
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
      <div className="team" style={{ background: getMetallicGradient(teamBColor)}}>
        <div className="team-logo">
        <div class="left-moon"></div>
          {renderTeamLogo(teamBLogo, isTeamBImage, teamBImageColor)}
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
export default Scoreboard;
