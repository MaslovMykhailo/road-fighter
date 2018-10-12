import React from 'react';

import '../../css/score-panel.css';
import crashIcon from '../../img/score/crash.png';
import timerIcon from '../../img/score/timer.png';


const ScorePanel = props => (
  <div className={'score-panel'}>
    <img className={'score-panel__timer-icon'} src={timerIcon} alt={'crashIcon'}/>
    <span className={'score-panel__score'}>
      {props.time}
      </span>
    <img className={'score-panel__crash-icon'} src={crashIcon} alt={'crashIcon'}/>
    <span className={'score-panel__score'}>
      {props.collisionCount}
      </span>
  </div>
);

export default ScorePanel;