import React, { Component } from 'react';

import '../css/app.css';
import Start from './window/Start';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
    
    };
  }
  
  render() {
    return (
      <div className={'app'}>
        <Start />
      </div>
    )
  }
}

export default App;