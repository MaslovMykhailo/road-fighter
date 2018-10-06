import React, { Component } from 'react';
import '../css/road.css'
import carImg from '../img/car.png';
import Road from './classes/Road';
import Car from './classes/Car';


class App extends Component {
  constructor(props) {
    super(props);
    
    this.canvas = React.createRef();
    
    this.carImg = new Image();
    this.carImg.src = carImg;
    this.carImg.onload = () => this.forceUpdate();
    
    this.state = {
      ctx: null,
      width: null,
      height: null,
      road: null,
      car: null,
      carPosition: {
        x: null,
        y: null
      },
      carSpeed: 1,
      stop: true,
      stopping: false
    };
    
    this.moving = this.moving.bind(this);
    this.stopping = this.stopping.bind(this);
  }
  
  componentDidMount() {
    const width = this.canvas.current.offsetWidth;
    const height = this.canvas.current.offsetHeight;
  
    this.canvas.current.width = width;
    this.canvas.current.height = height;
    
    this.setState({
      ctx: this.canvas.current.getContext('2d'),
      width, height,
      road: new Road(width, height),
      car: new Car(52, 100, this.carImg),
      carPosition: {
        x: width/2,
        y: 0
      }
    });
  }
  
  stopping() {
    const self = this;
    
    this.setState({
      stopping: true
    });
    
    requestAnimationFrame(function animate() {
      const { carSpeed, carPosition, road, stop } = self.state;
    
      road.addShift(carSpeed - 0.1);
      
      self.setState({
        carSpeed: carSpeed - 0.3 <= 1 ? 1 : carSpeed - 0.3,
        carPosition: {
          x: carPosition.x,
          y: carSpeed - 0.1,
        }
      });
    
      if (!stop && carSpeed > 1.1) {
        requestAnimationFrame(animate);
      } else {
        console.log(carSpeed);
  
        self.setState({
          stop: true,
          carSpeed: 1
        })
      }
    });
  }
  
  moving() {
    const self = this;
    
    this.setState({
      stop: false,
      stopping: false
    });
    
    requestAnimationFrame(function animate() {
      const { carSpeed, carPosition, stop, road, stopping } = self.state;
      
      road.addShift(carSpeed + 0.025);
      
      self.setState({
        carSpeed: carSpeed + 0.05 <= 12 ? carSpeed + 0.05 : carSpeed,
        carPosition: {
          x: carPosition.x,
          y: carSpeed + 0.025,
        }
      });
    
      if (!stopping && !stop) requestAnimationFrame(animate);
    });
  }
  
  render() {
    const { ctx, width, height, road, car } = this.state;
    
    if (ctx) {
      ctx.clearRect(0, 0, width, height);
      road.draw(ctx);
      car.draw(ctx, width/2, height - 200);
    }
    
    return (
      <canvas className={'road'} ref={this.canvas} onMouseDown={this.moving} onMouseUp={this.stopping}>
      </canvas>
    )
  }
}

export default App;
