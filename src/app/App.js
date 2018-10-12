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
      currentResult: null,
      bestResults: new Array(5).fill(null),
      doc: this.props.doc
    };
    
    this.changeWindowHandler = this.changeWindowHandler.bind(this);
    this.chooseLevelHandler = this.chooseLevelHandler.bind(this);
    this.changePlayerCarHandler = this.changePlayerCarHandler.bind(this);
    this.playerFinishedHandler = this.playerFinishedHandler.bind(this);
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
  
  playerFinishedHandler(time, collisions) {
    const { bestResults, level } = this.state;
  
    const currentResult = {
      time, collisions,
      score: Math.round(10000000/(time + collisions*5)*(level+1))
    };
    
    if (!bestResults[level] || bestResults[level].score < currentResult.score) {
      const newBestResults = bestResults.slice();
      newBestResults[level] = currentResult;
      
      this.setState({
        currentResult,
        bestResults: newBestResults
      });
    } else {
      this.setState({
        currentResult
      });
    }
  }
  
  render() {
    const {
      changeWindowHandler,
      chooseLevelHandler,
      changePlayerCarHandler,
      playerFinishedHandler
    } = this;
    
    const handlers = {
      changeWindowHandler,
      chooseLevelHandler,
      changePlayerCarHandler,
      playerFinishedHandler
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