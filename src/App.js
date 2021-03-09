
import './App.css';
import Board from './components/Board';
import React from 'react';
import Dropdown from './components/Dropdown'
import paw from './assets/catpaw.png';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        rows:8,
        columns:8,
        playing: true,
    }
    this.submitHandlerSizes = this.submitHandlerSizes.bind(this);
    this.follow = this.follow.bind(this);
    this.restart = this.restart.bind(this);
  }
  
  componentDidMount() {
    document.addEventListener("mousemove", this.follow);
  }

  follow(e) {
    let paw = document.getElementById('paw'); 
    paw.style.left = e.pageX + 10 + 'px';
    paw.style.top = e.pageY + 10 + 'px';
  }

  submitHandlerSizes(obj) {
    this.setState({rows: obj.rows, columns: obj.columns, playing: true});
  }

  restart() {
    this.setState({playing: true});
  }

  componentWillUnmount() {
    document.removeEventListener("mousemove", this.follow);
  }

  render() {
    return (
    <div className="App">
        <h1>Welcome to MiceSweeper</h1>
        <h4>You're a pacifist cat trying really hard to not catch the mice in the house</h4>
        <Dropdown submitHandler={this.submitHandlerSizes}/>
        <Board id={'noContextMenu'} playing={this.state.playing} size={{rows: this.state.rows, columns: this.state.columns}} restart={this.restart}/>
        <img src={paw} id={"paw"} style={{height: '40px', width: '40px', position: 'absolute'}}/>
    </div>
  );
  }
}

export default App;
