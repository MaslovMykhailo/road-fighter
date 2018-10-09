import React from 'react';

import '../../css/start.css';
import cup from '../../img/start/cup.png';
import gif from  '../../img/start/car_background.gif';
import finish from  '../../img/start/img_finish.png';


const Start = props => (
  <div className={'start'}>
    <div className={'start__image__wrapper'}>
      <img className={'start__image'} src={gif} alt={'car'}/>
      <img className={'start__image'} src={cup} alt={'cup'}/>
      <img className={'start__image start__mirror'} src={gif} alt={'car'}/>
    </div>
    <div className={'title'}>
      <img className={'title__image start__mirror'} src={finish} alt={'finish'}/>
      <span className={'title__text'}>
        ROAD FIGHTER
      </span>
      <img className={'title__image'} src={finish} alt={'finish'}/>
    </div>
    <button className="play-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
      PLAY
    </button>
  </div>
);

export default Start