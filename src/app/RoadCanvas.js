import React, { Component } from 'react';

import animation from './functions/animation';
import combineFunc from './functions/combineFunc';
import rn from './functions/randomNumber';
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
      isFinished: false,
      
      playerCar: null,
      playerCarState: {
        speed: 0,
        positionX: null,
        racing: false,
        braking: false,
        stop: true,
        maxSpeed: 12
      },
      
      botCars: [],
      botCarsState: [],
    };
    
    this.moveXHandler = this.moveXHandler.bind(this);
    
    this.startRacingHandler = this.startRacingHandler.bind(this);
    this.endRacingHandler = this.endRacingHandler.bind(this);
    
    this.startBrakingHandler = this.startBrakingHandler.bind(this);
    this.endBrakingHandler = this.endBrakingHandler.bind(this);
  
    this.botCarsMove = this.botCarsMove.bind(this);
  }
  
  componentDidMount() {
    const {
      moveXHandler,
      startRacingHandler,
      endRacingHandler,
      startBrakingHandler,
      endBrakingHandler,
    } = this;
    
    const { userCar, botCars, addKeyUpDownHandler } = this.props;
    const canvasElem = this.canvas.current;
    
    const width = canvasElem.offsetWidth;
    const height = canvasElem.offsetHeight;
    
    canvasElem.width = width;
    canvasElem.height = height;
    
    this.setState({
      ctx: this.canvas.current.getContext('2d'),
      width, height,
      road: new Road(width, height, 50),
      
      playerCar: new Car(userCar.width, userCar.height, userCar.img),
      playerCarState: Object.assign({}, this.state.playerCarState,
        {positionX: width / 2 - userCar.width / 2}),
      
      botCars: botCars.map(car => new Car(car.width, car.height, car.img)),
      botCarsState: botCars.map((car, i) => ({
        speed: rn(1, 6),
        positionX: 15 + i*width/4,
        positionY: height
      }))
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
    
    this.botCarsMove();
  }
  
  moveXHandler(direction) {
    return () => {
      const { playerCarState, width } = this.state;
      let { positionX, speed } = playerCarState;
  
      let changedPosition = direction === 'left' ?
        positionX - speed :
        positionX + speed;
      
      if (changedPosition > -2 && changedPosition + this.props.userCar.width - 3 < width) {
        this.setState({
          playerCarState: Object.assign({}, playerCarState, { positionX: changedPosition })
        });
      }
    }
  }
  
  startRacingHandler() {
    const { playerCarState, road, isFinished } = this.state;
    
    if (!playerCarState.racing && !isFinished) {
      
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
          const { playerCarState, road } = this.state;
          if (road.shift > road.height-road.canvasHeight) {
            this.props.clearKeyUpDownHandlers();
            this.setState({
              isFinished: false,
              playerCarState: Object.assign({}, playerCarState, {speed: 0, stop: true})
            });
            return false;
          }
          return playerCarState.racing;
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
    const { playerCarState, road, isFinished } = this.state;
    if (!playerCarState.braking && !playerCarState.stop && !isFinished) {
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
  
  botCarsMove() {
    const animateOptions = {
      animateFunc: () => {
        const { botCarsState, botCars, road, height } = this.state;
      
        const newCars = botCars.slice();
        const newCarsState = botCarsState.map((oldState, i) => {
          let newPositionY = oldState.positionY + oldState.speed;
          let newSpeed = oldState.speed;
          
          if (newPositionY < road.shift - 0.5 * height) {
            newPositionY = road.shift + 1.5 * height ;
            newSpeed = rn(1, 6);
            
            let newBotCar = this.props.botCars[rn(0, 3)];
            newCars.splice(i, 1, new Car(newBotCar.width, newBotCar.height, newBotCar.img))
          }
          
          return {
            speed: newSpeed,
            positionX: oldState.positionX,
            positionY: newPositionY
          }
        });
      
        this.setState({
          botCars: newCars,
          botCarsState: newCarsState
        });
      },
      conditionalFunc: () => {
        return !this.state.isFinished
      }
    };
  
    animation(animateOptions);
  }
  
  render() {
    const { ctx, width, height, road, playerCar, playerCarState, botCars, botCarsState } = this.state;
    
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      road.draw(ctx);
      
      playerCar.draw(ctx, playerCarState.positionX, height - 200);
      botCars.forEach((car, i) => {
        car.draw(ctx, botCarsState[i].positionX, height + road.shift - botCarsState[i].positionY);
      });
    }
    
    return (
      <canvas className={'road'} ref={this.canvas}>
      </canvas>
    )
  }
}

export default RoadCanvas;