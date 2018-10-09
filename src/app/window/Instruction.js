import React from 'react';

import '../../css/window.css';
import arrows from '../../img/window/arrows.png';

const Instruction = ({ onClickHandler, backClickHandler }) => (
  <div className="window mdl-card mdl-shadow--2dp">
    <div className="window__header--small mdl-card__title">
      <h2 className="window__caption mdl-card__title-text">Instruction</h2>
    </div>
    <span className="window__text">
      press and hold to drive
    </span>
    <div className="window__middle-wrapper">
      <span className="window__text">
        press to move left
      </span>
      <img className="arrows" src={arrows} alt={'arrows'} />
      <span className="window__text">
        press to move right
      </span>
    </div>
    <span className="window__text">
      press to brake
    </span>
    <button
      className="start-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
      onClick={onClickHandler}
    >
      START
    </button>
    <button
      className="window-back mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
      onClick={backClickHandler}
    >
      <i className="material-icons">arrow_back</i>
    </button>
  </div>
);

export default Instruction;