import React from 'react';
import { render } from 'react-dom';

class AppDescription extends React.Component {
  render() {
    return (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
    );
  }
};

class App extends React.Component {

  state = {
    status: 'off',
    time: 1200,
    timer: null
  };

  formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return [
      hours,
      minutes > 9 ? minutes : (hours ? '0' + minutes : minutes || '00'),
      seconds > 9 ? seconds : '0' + seconds
    ].filter(Boolean).join(':');
  }
  
  step = () => {
    if(this.state.time == 0 && this.state.status === 'work') {
      this.setState({ status: 'rest', time: 20 });
      this.playBell();
    } else if(this.state.time == 0 && this.state.status === 'rest') {
      this.setState({ status: 'work', time: 1200 });
      this.playBell();
    }
    this.setState({
      time: this.state.time -1,
    });
  };
  
  startTimer = () => {
    this.setState({
      status: 'work',
      time: 1200,
      timer: setInterval(this.step, 1000),
    });
  };

  stopTimer = () => {
    this.setState({
      status: 'off',
      time: 0,
      //timer: setInterval(this.step, 1000),
      timer: clearInterval(this.state.timer),
    });
  };

  closeApp = () => {
    window.close();
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  render() {
    const { status } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
