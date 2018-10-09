import React, { Component } from 'react';

import '../css/app.css';
import { START } from './constants/windowTypes';
import Window from './window/Window';
import { onLoad } from './functions/loadImages';

class App extends Component {
  constructor(props) {
    super(props);
  
    onLoad.then(() => this.forceUpdate());
  
    this.state = {
      level: null,
      playerCar: 0,
      currentWindow: START,
      doc: this.props.doc
    };
    
    this.changeWindowHandler = this.changeWindowHandler.bind(this);
    this.chooseLevelHandler = this.chooseLevelHandler.bind(this);
    this.changePlayerCarHandler = this.changePlayerCarHandler.bind(this);
  }
  
  chooseLevelHandler(level) {
    this.setState({
      level
    });
  }
  
  changeWindowHandler(newWindow) {
    return () => {
      this.setState({
        currentWindow: newWindow
      });
    }
  }
  
  changePlayerCarHandler(i) {
    this.setState({
      playerCar: i
    });
  }
  
  render() {
    const { changeWindowHandler, chooseLevelHandler, changePlayerCarHandler } = this;
    const handlers = {
      changeWindowHandler,
      chooseLevelHandler,
      changePlayerCarHandler
    };
    
    return (
      <div className={'app'}>
        <Window appState={this.state}
                handlers={handlers}/>
      </div>
    )
  }
}

export default App;