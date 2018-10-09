import React from 'react';

import '../../css/window.css';

const ChooseLevel = props => {
  const { onClickHandler, backClickHandler } = props;
  
  const levelButtons = new Array(5).fill(null).map((e, i) => (
    <button
      className="choose-level-button mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
      key={i}
      onClick={onClickHandler(i)}
    >
      {`~ Level${i+1} ~`}
    </button>
  ));
  
  return (
  <div className="window mdl-card mdl-shadow--2dp">
    <div className="window__header choose-level-background mdl-card__title">
      <h2 className="window__caption mdl-card__title-text">Choose level</h2>
    </div>
    <div className={'window__button-container'}>
    {levelButtons}
    </div>
    <button
      className="window-back mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
      onClick={backClickHandler}
    >
      <i className="material-icons">arrow_back</i>
    </button>
  </div>
)};

export default ChooseLevel;