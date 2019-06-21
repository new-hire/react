import React from 'react';
import Webcam from './component/webcam';

const initialState = {
  loaded: false,
  pause: false
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.webcam = new Webcam("videoElement", this.successCallback, this.errorCallback);
  }

  componentWillUnmount() {
  }

  successCallback = () => {
    console.log('got a webcam stream!!');
  };

  errorCallback = (error) => {
    console.log('error to get a webcam stream!! message: ', error);
  };

  releaseStream = () => {
    this.webcam && this.webcam.release();
    this.setState(ps => ({
      ...ps,
      pause: true
    }));
  };

  createStream = () => {
    this.webcam && this.webcam.create();
    this.setState(ps => ({
      ...ps,
      pause: false
    }));
  };

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <video autoPlay={true} id="videoElement" />
        <div>
        {!this.state.pause && <button type="button" style={{width: '150px'}} onClick={this.releaseStream}>{"release stream"}</button>}
        {this.state.pause && <button type="button" style={{width: '150px'}} onClick={this.createStream}>{"create stream"}</button>}
        </div>
      </div>
    );
  }
}
