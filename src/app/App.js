import React, { Component } from 'react';

import '../css/app.css';
import ChooseCar from './window/ChooseCar';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    
    };
  }
  
  render() {
    return (
      <div className={'app'}>
        <ChooseCar />
      </div>
    )
  }
}

export default App;