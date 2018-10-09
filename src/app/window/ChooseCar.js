import React, { Component } from 'react';

import '../../css/window.css';
import { playerCars } from '../functions/loadImages';

class ChooseCar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      cars: new Array(3).fill(false).map((v, i) => props.playerCar === i )
    };
    
    this.onClickHandler = this.onClickHandler.bind(this);
  }
  
  onClickHandler(i) {
    return () => {
      const newCars = new Array(3).fill(false);
      newCars[i] = true;
      this.props.changePlayerCarHandler(i);
      
      this.setState({
        cars: newCars
      });
    }
  }
  
  render() {
    const cars = this.state.cars.map((v, i) => (
      <div key={i} className={(v ? 'container-checked ': '') +
      "car-button-container mdl-card mdl-shadow--2dp"}>
        <button className="choose-car-button mdl-button mdl-js-button mdl-button--fab"
                onClick={this.onClickHandler(i)}
        >
          <img className="car-image" src={playerCars[i].src} alt={'car'}/>
        </button>
      </div>
    ));
    
    const { backClickHandler, forwardClickHandler } = this.props;
    
    return (
      <div className="window mdl-card mdl-shadow--2dp">
        <div className="window__header choose-car-background text-right mdl-card__title">
          <h2 className="window__caption mdl-card__title-text">Choose car</h2>
        </div>
        <div className="car-container">
          {cars}
        </div>
        <button
          className="window-back mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
          onClick={backClickHandler}
        >
          <i className="material-icons">arrow_back</i>
        </button>
        <button
          className="window-next mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored"
          onClick={forwardClickHandler}
        >
          <i className="material-icons">arrow_forward</i>
        </button>
      </div>
    )
  }
}

export default ChooseCar;