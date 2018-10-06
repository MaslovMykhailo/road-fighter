import React, { Component } from 'react';

import * as loadImg from './functions/loadImages';
import RoadCanvas from './RoadCanvas';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.carsImg = loadImg.cars;
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
    const { carsImg, changeProgressHandler, addKeyUpDownHandler } = this;
    
    return (
      <RoadCanvas
        userCar={{
          img: carsImg[0],
          width: 70,
          height: 133
        }}
        changeProgress={changeProgressHandler}
        addKeyUpDownHandler={addKeyUpDownHandler}
      />
    );
  }
}

export default App;
