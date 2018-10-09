import React, { Component } from 'react';

import '../../css/progress.css';
import { progressImg } from '../functions/loadImages';
import Progress from './classes/Progress';


class ProgressCanvas extends Component {
  constructor(props) {
    super(props);
  
    this.canvas = React.createRef();
  
    this.state = {
      ctx: null,
      width: null,
      height: null,
      progress: null
    }
  }
  
  componentDidMount() {
    const { long, userCar } = this.props;
    const canvasElem = this.canvas.current;
    
    const width = canvasElem.offsetWidth;
    const height = canvasElem.offsetHeight;
    
    canvasElem.width = width;
    canvasElem.height = height;
    
    this.setState({
      ctx: canvasElem.getContext('2d'),
      width, height,
      progress: new Progress(width, height, long, {
        start: progressImg[0],
        finish: progressImg[1],
        playerCarImg: userCar
      })
    });
  }
  
  render() {
    const { ctx, progress, width, height } = this.state;
  
    if(ctx) {
      progress.setShift(this.props.progress);
      ctx.clearRect(0, 0, width, height);
      progress.draw(ctx);
    }
    return(
      <canvas className={'progress'} ref={this.canvas}>
      </canvas>
    )
  }
}

export default ProgressCanvas;