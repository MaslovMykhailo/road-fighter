import React from 'react';

import '../../css/window.css';
import music from '../../mp3/finish.mp3';


const Finish = props => {
  const { currentResult, bestResults, chooseLevelHandler, nextLevelHandler, level } = props;
  let empty = '--//--';
  const bestResultsTr = bestResults.map((res, i) => {
    if (res) {
      return (
        <tr>
          <td className="mdl-data-table__cell--non-numeric">{i+1}</td>
          <td>{res.time}</td>
          <td>{res.collisions}</td>
          <td>{res.score}</td>
        </tr>
      )
    } else {
      return (
        <tr key={i+1}>
          <td className="mdl-data-table__cell--non-numeric">{i+1}</td>
          <td>{empty}</td>
          <td>{empty}</td>
          <td>{empty}</td>
        </tr>
      )
    }
  });
  
  return (
  <div className="window mdl-card mdl-shadow--2dp">
    <audio src={music} autoPlay={true}></audio>
    <div className="window__header--small mdl-card__title">
      <h2 className="window__caption mdl-card__title-text">You finished!</h2>
    </div>
    <table className="window__table mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
      <caption className="window__table__caption">Your result</caption>
      <thead>
        <tr>
          <th>Time</th>
          <th>Collisions</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{currentResult.time}</td>
          <td>{currentResult.collisions}</td>
          <td>{currentResult.score}</td>
        </tr>
      </tbody>
    </table>
    <table className="window__table mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
      <caption className="window__table__caption">Best result by level</caption>
      <thead>
        <tr>
          <th className="mdl-data-table__cell--non-numeric">Level</th>
          <th>Time</th>
          <th>Collisions</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {bestResultsTr}
      </tbody>
    </table>
    <div className="bottom-button-container">
      <button
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        onClick={chooseLevelHandler}
      >
        choose level
      </button>
      <button
        className="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        onClick={nextLevelHandler}
        style={{display: level !== 4 ? 'block' : 'none'}}
      >
        next level
      </button>
    </div>
  </div>
)};


export default Finish;