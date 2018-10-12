import React, { Component } from 'react';

import '../../css/game.css';
import * as loadImg from '../functions/loadImages';
import RoadCanvas from './RoadCanvas';
import StreetCanvas from './StreetCanvas';
import ProgressCanvas from './ProgressCanvas';
import ScorePanel from './ScorePanel';

class Game extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      commonProgress: 0,
      time: 0,
      collisionCount: 0,
      keyUpDownHandlers: {
        up: {
          left: [], top: [], right: [], bottom: []
        },
        down: {
          left: [], top: [], right: [], bottom: []
        }
      }
    };
    
    this.timerId = null;
    
    this.changeProgressHandler = this.changeProgressHandler.bind(this);
    this.addKeyUpDownHandler = this.addKeyUpDownHandler.bind(this);
    this.clearKeyUpDownHandlers = this.clearKeyUpDownHandlers.bind(this);
    this.onKeyUpDown = this.onKeyUpDown.bind(this);
    this.collisionInc = this.collisionInc.bind(this);
    this.playerFinishedHandler = this.playerFinishedHandler.bind(this);
  }
  
  timerInc() {
    this.setState(state => ({
      time: state.time + 1
    }));
  }
  
  changeProgressHandler(change) {
    let { commonProgress } = this.state;
    commonProgress += change;
    
    this.setState({
      commonProgress
    });
  }
  
  addKeyUpDownHandler(handlerType, ...args) {
    const { keyUpDownHandlers } = this.state;
    const handlerByType = Object.assign({}, keyUpDownHandlers[handlerType]);
    
    args.forEach(arg => {
      let arrowType = arg[0];
      const handler = arg[1];
      
      handlerByType[arrowType].push(handler);
    });
    keyUpDownHandlers[handlerType] = handlerByType;
    
    this.setState({
      keyUpDownHandlers: Object.assign({}, keyUpDownHandlers)
    });
  }
  
  clearKeyUpDownHandlers() {
    this.setState({
      keyUpDownHandlers: {
        up: {
          left: [], top: [], right: [], bottom: []
        },
        down: {
          left: [], top: [], right: [], bottom: []
        }
      }
    });
  }
  
  onKeyUpDown(type) {
    const { keyUpDownHandlers } = this.state;
    const handlerByType = keyUpDownHandlers[type];
    
    return (e) => {
      switch (e.keyCode) {
        case 37: {
          handlerByType.left.forEach(handler => handler());
          return;
        }
        case 38: {
          handlerByType.top.forEach(handler => handler());
          return;
        }
        case 39: {
          handlerByType.right.forEach(handler => handler());
          return;
        }
        case 40: {
          handlerByType.bottom.forEach(handler => handler());
          return;
        }
        default:
          return;
      }
    }
  }
  
  collisionInc() {
    this.setState(state => ({
      collisionCount: state.collisionCount + 1,
    }));
  }
  
  componentDidMount() {
    this.props.doc.onkeydown = this.onKeyUpDown('down');
    this.props.doc.onkeyup = this.onKeyUpDown('up');
    this.timerId = setInterval(
      () => this.timerInc(),
      1000
    );
  };
  
  componentWillUnmount() {
    clearInterval(this.timerId);
  }
  
  playerFinishedHandler() {
    const { time, collisionCount } = this.state;
    this.props.playerFinished(time, collisionCount);
  }
  
  render() {
    const {
      changeProgressHandler,
      addKeyUpDownHandler,
      clearKeyUpDownHandlers,
      collisionInc,
      playerFinishedHandler
    } = this;
    
    const { commonProgress, collisionCount, time } = this.state;
    const playerCar = loadImg.playerCars[this.props.playerCar];
    
    let long = 35 + this.props.level * 5;
    let imgW = 55;
    let imgH = 110;
    const userCar = { img: playerCar, width: imgW, height: imgH };
    const botCarsImgs = loadImg.botCars.map(img => ({ img, width: imgW, height: imgH }));
    
    return (
      <div className={'game'}>
        <ProgressCanvas progress={commonProgress} long={long} userCar={playerCar}/>
        <StreetCanvas progress={commonProgress} side={'left'} long={long}/>
        <RoadCanvas
          long={long}
          level={this.props.level}
          userCar={userCar}
          botCars={botCarsImgs}
          changeProgress={changeProgressHandler}
          addKeyUpDownHandler={addKeyUpDownHandler}
          clearKeyUpDownHandlers={clearKeyUpDownHandlers}
          collisionInc={collisionInc}
          playerFinishedHandler={playerFinishedHandler}
        />
        <StreetCanvas progress={commonProgress} side={'right'} long={long}/>
        <ScorePanel time={time} collisionCount={collisionCount}/>
      </div>
    );
  }
}

export default Game;
