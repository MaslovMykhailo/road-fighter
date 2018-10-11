import React, { Component } from 'react';


import '../../css/score-panel.css';
import crashIcon from '../../img/score/crash.png';
import timerIcon from '../../img/score/timer.png';


class ScorePanel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      time: 0
    };
    this.timerID = null;
  }
  
  componentDidMount() {
    this.timerID = setInterval(
      () => this.timerInc(),
      1000
    );
  }
  
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  
  timerInc() {
    this.setState(state => ({
      time: state.time + 1
    }));
  }
  
  render() {
    return (
      <div className={'score-panel'}>
        <img className={'score-panel__timer-icon'} src={timerIcon} alt={'crashIcon'}/>
        <span className={'score-panel__score'}>
          {this.state.time}
        </span>
        <img className={'score-panel__crash-icon'} src={crashIcon} alt={'crashIcon'}/>
        <span className={'score-panel__score'}>
          {this.props.collisionCount}
        </span>
      </div>
    )
  }
}

export default ScorePanel;