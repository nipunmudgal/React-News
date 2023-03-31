import './App.css';

import React, { Component } from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';

export default class App extends Component {
  
  render() { // screen par html ko render karna.... pehle jss ko html m compile krna..
    return (
      <div>
        <Navbar/>
        <News pageSize={5} country="in" category="science"/>
      </div>
    )
  }
}
// proptypes hum class based components mai daal sakte hai