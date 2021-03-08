import logo from './logo.svg';
import './App.css';
import Board from './components/Board';
import React from 'react';
import Dropdown from './components/Dropdown'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        rows:8,
        columns:8
    }
    this.submitHandlerSizes = this.submitHandlerSizes.bind(this);
  }

  submitHandlerSizes(obj) {
    this.setState({rows: obj.rows, columns: obj.columns});
  }

  render() {
    console.log('THIS STATE',this.state);
    return (
    <div className="App">
        <h1>Welcome to MiceSweeper</h1>
        <Dropdown submitHandler={this.submitHandlerSizes}/>
        <Board size={{rows: this.state.rows, columns: this.state.columns}}/>
    </div>
  );
  }
}

export default App;
