import React, { Component } from 'react';

import * as loadImg from './functions/loadImages';
import RoadCanvas from './RoadCanvas';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.playerCars = loadImg.playerCars;
    this.botCars = loadImg.botCars;
    loadImg.onLoad.then(() => this.forceUpdate());
    
    this.state = {
      commonProgress: 0,
      keyUpDownHandlers: {
        up: {
          left: [], top: [], right: [], bottom: []
        },
        down: {
          left: [], top: [], right: [], bottom: []
        }
      }
    };
    
    this.changeProgressHandler = this.changeProgressHandler.bind(this);
    this.addKeyUpDownHandler = this.addKeyUpDownHandler.bind(this);
    this.clearKeyUpDownHandlers = this.clearKeyUpDownHandlers.bind(this);
    this.onKeyUpDown = this.onKeyUpDown.bind(this);
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
    console.log('clear');
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
  
  componentDidMount() {
    const testHandlers = (type, arrow) => () => {
      console.log(type, arrow);
    };
  
    this.addKeyUpDownHandler('down',
      ['left', testHandlers('down', 'left')],
      ['top', testHandlers('down', 'top')],
      ['right', testHandlers('down', 'right')],
      ['bottom', testHandlers('down', 'bottom')]
    );
  
    this.addKeyUpDownHandler('up',
      ['left', testHandlers('up', 'left')],
      ['top', testHandlers('up', 'top')],
      ['right', testHandlers('up', 'right')],
      ['bottom', testHandlers('up', 'bottom')]
    );
  
    this.props.doc.onkeydown = this.onKeyUpDown('down');
    this.props.doc.onkeyup = this.onKeyUpDown('up');
  };
  
  render() {
    const { playerCars, botCars,
      changeProgressHandler,
      addKeyUpDownHandler,
      clearKeyUpDownHandlers
    } = this;
    
    let imgW = 55;
    let imgH = 100;
    const botCarsImgs = botCars.map(img => ({ img, width: imgW, height: imgH }));
    
    return (
      <RoadCanvas
        userCar={{
          img: playerCars[0],
          width: imgW,
          height: imgH
        }}
        botCars={botCarsImgs}
        changeProgress={changeProgressHandler}
        addKeyUpDownHandler={addKeyUpDownHandler}
        clearKeyUpDownHandlers={clearKeyUpDownHandlers}
      />
    );
  }
}

export default App;
