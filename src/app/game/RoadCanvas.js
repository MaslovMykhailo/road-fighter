import React, { Component } from 'react';

import animation from '../functions/animation';
import combineFunc from '../functions/combineFunc';
import rn from '../functions/randomNumber';
import carsCollision from '../functions/carsCollision';
import '../../css/road.css';
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
        moveByX: false,
        maxSpeed: 12
      },
      
      botCars: [],
      botCarsState: [],
    };
    
    this.startMoveXHandler = this.startMoveXHandler.bind(this);
    this.endMoveXHandler = this.endMoveXHandler.bind(this);
    
    this.startRacingHandler = this.startRacingHandler.bind(this);
    this.endRacingHandler = this.endRacingHandler.bind(this);
    
    this.startBrakingHandler = this.startBrakingHandler.bind(this);
    this.endBrakingHandler = this.endBrakingHandler.bind(this);
  
    this.botCarsMove = this.botCarsMove.bind(this);
    this.collisionHandler = this.collisionHandler.bind(this);
  }
  
  componentDidMount() {
    const {
      startMoveXHandler,
      startRacingHandler,
      endRacingHandler,
      startBrakingHandler,
      endBrakingHandler,
      endMoveXHandler
    } = this;
    
    const { long ,userCar, botCars, addKeyUpDownHandler } = this.props;
    const canvasElem = this.canvas.current;
    
    const width = canvasElem.offsetWidth;
    const height = canvasElem.offsetHeight;
    
    canvasElem.width = width;
    canvasElem.height = height;
    
    this.setState({
      ctx: canvasElem.getContext('2d'),
      width, height,
      road: new Road(width, height, long),
      
      playerCar: new Car(userCar.width, userCar.height, userCar.img),
      playerCarState: Object.assign({}, this.state.playerCarState,
        {positionX: width / 2 - userCar.width / 2}),
      
      botCars: botCars.map(car => new Car(car.width, car.height, car.img)),
      botCarsState: botCars.map((car, i) => ({
        speed: rn(1, 6),
        positionX: 15 + i*width/4,
        positionY: 2*height + (i%2 ? 0.5*height : - 0.5*height)
      }))
    });
    
    addKeyUpDownHandler('down',
      ['left', startMoveXHandler('left')],
      ['top', combineFunc(endBrakingHandler,startRacingHandler)],
      ['right', startMoveXHandler('right')],
      ['bottom', startBrakingHandler],
    );
  
    addKeyUpDownHandler('up',
      ['left', endMoveXHandler],
      ['top', combineFunc(endRacingHandler, startBrakingHandler)],
      ['right', endMoveXHandler],
      ['bottom', endBrakingHandler]
    );
    
    this.botCarsMove();
  }
  
  startMoveXHandler(direction) {
    return () => {
       const {playerCarState} = this.state;
       if (!playerCarState.moveByX) {
        this.setState({
          playerCarState: Object.assign({}, playerCarState, { moveByX: true })
        });
        
        const animateOptions = {
          animateFunc: () => {
            const { playerCarState, width } = this.state;
            let { positionX, speed } = playerCarState;
  
            let changedPosition = direction === 'left' ?
              positionX - speed/4 :
              positionX + speed/4;
  
            if (changedPosition > -2 && changedPosition + this.props.userCar.width - 3 < width) {
              this.setState({
                playerCarState: Object.assign({}, playerCarState, { positionX: changedPosition })
              });
            }
          },
          conditionalFunc: () => {
            return this.state.playerCarState.moveByX;
          }
        };
        
        animation(animateOptions);
      }
      
    }
  }
  
  endMoveXHandler() {
    const { playerCarState } = this.state;
    this.setState({
      playerCarState: Object.assign({}, playerCarState, { moveByX: false })
    });
  }
  
  startRacingHandler() {
    const { playerCarState, road, isFinished } = this.state;
    
    if (!playerCarState.racing && !isFinished) {
      
      this.setState({
        playerCarState: Object.assign({}, playerCarState, {
          racing: true,
        })
      });
  
      const animateOptions = {
        animateFunc: () => {
          const { playerCarState } = this.state;
          const { speed, maxSpeed, braking } = playerCarState;
          
          road.addShift(speed + 0.05);
          this.props.changeProgress(speed + 0.05);
          let newSpeed = speed + 0.1;
          
          if (braking) newSpeed = speed;
          
          if (typeof this.collisionHandler() !== 'object') {
            newSpeed = 0;
          }
          
          this.setState({
            playerCarState: Object.assign({}, playerCarState, {
              speed: newSpeed <= maxSpeed ? newSpeed : maxSpeed,
            })
          });
        },
        conditionalFunc: () => {
          const { playerCarState, road } = this.state;
          if (road.shift > road.height-road.canvasHeight) {
            this.props.clearKeyUpDownHandlers();
            this.setState({
              isFinished: true,
              playerCarState: Object.assign({}, playerCarState, { speed: 0 })
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
      if (!playerCarState.braking && !isFinished) {
        this.setState({
          playerCarState: Object.assign({}, playerCarState, {
            braking: true,
          })
        });
    
        const animateOptions = {
          animateFunc: () => {
            const {playerCarState} = this.state;
            const {speed, racing} = playerCarState;
        
            if (!racing) {
              road.addShift(speed - 0.1);
              this.props.changeProgress(speed - 0.1);
            }
           
            let newSpeed = speed - 0.2 + racing/10;
            if (typeof this.collisionHandler() !== 'object') {
              newSpeed = -5;
            }
            
            this.setState({
              playerCarState: Object.assign({}, playerCarState, {
                speed: newSpeed <= 0 ? 0 : newSpeed,
              })
            });
          },
          conditionalFunc: () => {
            return this.state.playerCarState.speed >= 0.1;
          },
          endAnimateFunc: () => {
            this.endBrakingHandler();
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
          
          if (newPositionY < road.shift - 0.2 * height) {
            newPositionY = road.shift + 1.5 * height ;
            newSpeed = rn(1, 6);
            
            let newBotCar = this.props.botCars[rn(0, 3)];
            newCars.splice(i, 1, new Car(newBotCar.width, newBotCar.height, newBotCar.img))
          }
          
          if (newPositionY > road.shift + 2*height) {
            newPositionY = road.shift + 1.5 * height ;
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
  
  collisionHandler() {
    const { playerCar, playerCarState, botCarsState, road } = this.state;
    const { width, height } = playerCar;
    
    const userCar = {
      positionX: playerCarState.positionX + 3,
      positionY: road.shift + 200,
      width: width - 6, height
    };
    
    const botCars = botCarsState.map(car => ({
      positionX: car.positionX + 3,
      positionY: car.positionY,
      width: width - 6, height
    }));
    
    return carsCollision(userCar, botCars);
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