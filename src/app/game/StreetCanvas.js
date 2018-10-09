import React, { Component } from 'react';

import '../../css/street.css';
import { trees, buildings } from '../functions/loadImages';
import Street from './classes/Street';


class StreetCanvas extends Component {
  constructor(props) {
    super(props);
  
    this.canvas = React.createRef();
  
    this.state = {
      ctx: null,
      width: null,
      height: null,
      street: null
    }
  }
  
  componentDidMount() {
    const { side, long } = this.props;
    const canvasElem = this.canvas.current;
  
    const width = canvasElem.offsetWidth;
    const height = canvasElem.offsetHeight;
  
    canvasElem.width = width;
    canvasElem.height = height;
    
    this.setState({
      ctx: canvasElem.getContext('2d'),
      width, height,
      street: new Street(width, height, side, long, { trees, buildings })
    });
  }
  
  render() {
    const { ctx, street, width, height } = this.state;
    
    if(ctx) {
      street.setShift(this.props.progress);
      
      ctx.clearRect(0, 0, width, height);
      street.draw(ctx);
    }
    
    return(
      <canvas className={'street'} ref={this.canvas}>
      </canvas>
    )
  }
}

export default StreetCanvas;