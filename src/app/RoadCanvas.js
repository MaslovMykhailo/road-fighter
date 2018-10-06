import React, { Component } from 'react';

import animation from './functions/animation';
import combineFunc from './functions/combineFunc';
import '../css/road.css';
import Road from './classes/Road';
import Car from './classes/Car';

class RoadCanvas extends Component {
  constructor(props) {
    super(props);
    
    this.canvas = React.createRef();
    
    this.state = {
      ctx: null,
      width: null,
      height: null,
      road: null,
      playerCar: null,
      
      playerCarState: {
        speed: 0,
        positionX: null,
        racing: false,
        braking: false,
        stop: true,
        maxSpeed: 12
      },
    };
    
    this.moveXHandler = this.moveXHandler.bind(this);
    
    this.startRacingHandler = this.startRacingHandler.bind(this);
    this.endRacingHandler = this.endRacingHandler.bind(this);
    
    this.startBrakingHandler = this.startBrakingHandler.bind(this);
    this.endBrakingHandler = this.endBrakingHandler.bind(this);
  }
  
  componentDidMount() {
    const {
      moveXHandler,
      startRacingHandler,
      endRacingHandler,
      startBrakingHandler,
      endBrakingHandler,
    } = this;
    
    const { userCar, addKeyUpDownHandler } = this.props;
    const canvasElem = this.canvas.current;
    
    const width = canvasElem.offsetWidth;
    const height = canvasElem.offsetHeight;
    
    canvasElem.width = width;
    canvasElem.height = height;
    
    this.setState({
      ctx: this.canvas.current.getContext('2d'),
      width, height,
      road: new Road(width, height),
      playerCar: new Car(userCar.width, userCar.height, userCar.img),
      playerCarState: Object.assign({}, this.state.playerCarState,
        { positionX: width/2 - userCar.width/2}),
    });
    
    addKeyUpDownHandler('down',
      ['left', moveXHandler('left')],
      ['top', startRacingHandler],
      ['right', moveXHandler('right')],
      ['bottom', startBrakingHandler],
    );
  
    addKeyUpDownHandler('up',
      ['top', combineFunc(endRacingHandler, startBrakingHandler)],
      ['bottom', endBrakingHandler]
    );
  }
  
  moveXHandler(direction) {
    return () => {
      const { playerCarState, width } = this.state;
      let { positionX, speed } = playerCarState;
  
      let changedPosition = direction === 'left' ?
        positionX - speed/2 :
        positionX + speed/2;
      
      if (changedPosition > -2 && changedPosition + this.props.userCar.width - 3 < width) {
        this.setState({
          playerCarState: Object.assign({}, playerCarState, { positionX: changedPosition })
        });
      }
    }
  }
  
  startRacingHandler() {
    const { playerCarState, road } = this.state;
    
    if (!playerCarState.racing) {
      
      this.setState({
        playerCarState: Object.assign({}, playerCarState, {
          racing: true,
          stop: false
        })
      });
  
      const animateOptions = {
        animateFunc: () => {
          const { playerCarState } = this.state;
          const { speed, maxSpeed } = playerCarState;
          
          road.addShift(speed + 0.025);
          this.props.changeProgress(speed + 0.025);
          
          this.setState({
            playerCarState: Object.assign({}, playerCarState, {
              speed: speed + 0.05 <= maxSpeed ? speed + 0.05 : maxSpeed,
            })
          });
        },
        conditionalFunc: () => {
          return this.state.playerCarState.racing;
        }
      };
      
      animation(animateOptions);
    }
  }
  
  endRacingHandler() {
    const { playerCarState } = this.state;
    this.setState({
      playerCarState: Object.assign({}, playerCarState, {
        racing: false,
      })
    });
  }
  
  startBrakingHandler() {
    const { playerCarState, road } = this.state;
    if (!playerCarState.braking && !playerCarState.stop) {
      this.setState({
        playerCarState: Object.assign({}, playerCarState, {
          braking: true,
        })
      });
  
      const animateOptions = {
        animateFunc: () => {
          const { playerCarState } = this.state;
          const { speed } = playerCarState;
          
          road.addShift(speed - 0.1);
          this.props.changeProgress(speed - 0.1);
          
          this.setState({
            playerCarState: Object.assign({}, playerCarState, {
              speed: speed - 0.2 <= 0 ? 0 : speed - 0.2,
            })
          });
        },
        conditionalFunc: () => {
          return this.state.playerCarState.speed >= 0.1;
        },
        endAnimateFunc: () => {
          const { playerCarState } = this.state;
          this.setState({
            playerCarState: Object.assign({}, playerCarState, { braking: false })
          });
        }
      };
  
      animation(animateOptions);
    }
  }
  
  endBrakingHandler() {
    const { playerCarState } = this.state;
    this.setState({
      playerCarState: Object.assign({}, playerCarState, {
        braking: false,
      })
    });
  }
  
  render() {
    const { ctx, width, height, road, playerCar, playerCarState } = this.state;
    
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      road.draw(ctx);
      playerCar.draw(ctx, playerCarState.positionX, height - 200);
    }
    
    return (
      <canvas className={'road'} ref={this.canvas}>
      </canvas>
    )
  }
}

export default RoadCanvas;