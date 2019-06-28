import React from 'react';
import Webcam from './component/webcam';
import Canvas from './component/Canvas';

const initialState = {
  loaded: false,
  pause: false,
  error: true,
  errorMessage: ''
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
    this.setState(ps => ({
      ...ps,
      error: false
    }));
    if (this.webcam && this.webcam.stream) {
      if (this.requestID) {
        cancelAnimationFrame(this.requestID);
        this.requestID = null;
      }
      this.requestID = requestAnimationFrame(this.drawCanvas);
    }
  };

  drawCanvas = () => {
    if (!this.video.videoWidth) {
      if (this.requestID) {
        cancelAnimationFrame(this.requestID);
        this.requestID = null;
      }
      this.requestID = requestAnimationFrame(this.drawCanvas);
      this.setState(ps => ({...ps}));
      return;
    }
    this.setState(ps => ({...ps, loaded: true}));
    if (this.canvas) {
      this.canvas.draw(this.video, this.video.videoWidth, this.video.videoHeight);
      if (this.requestID) {
        cancelAnimationFrame(this.requestID);
        this.requestID = null;
      }
      this.requestID = requestAnimationFrame(this.drawCanvas);
    }
  };

  errorCallback = (error) => {
    console.log('error to get a webcam stream!! message: ', error);
    this.setState(ps => ({
      ...ps,
      error: true,
      loaded: false,
      errorMessage: error
    }));
  };

  releaseStream = () => {
    this.webcam && this.webcam.release();
    this.setState(ps => ({
      ...ps,
      pause: true,
      loaded: false
    }));
  };

  createStream = () => {
    this.webcam && this.webcam.create();
    this.setState(ps => ({
      ...ps,
      pause: false
    }));
  };

  handleZoomIn = (e) => {
    if (this.canvas)
      this.canvas.handleZoomIn(e);
  };

  handleZoomOut = (e) => {
    if (this.canvas)
      this.canvas.handleZoomOut(e);
  };

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        {this.state.error && this.state.errorMessage &&
        <div>
          Error Message: {this.state.errorMessage}
        </div>
        }
        {<video autoPlay={true} id="videoElement" style={{display: this.state.error ? 'none' : 'none', margin: 'auto', width: '800px', height: '450px'}} ref={r => this.video = r}/>}
        {<Canvas video={this.video} showCanvas={!this.state.error} ref={r => this.canvas = r}/>}
        {!this.state.error &&
        <div style={{display: this.state.error ? 'none' : 'block'}}>
          {!this.state.pause &&
          <button type="button" style={{width: '150px'}} onClick={this.releaseStream}>{"release stream"}</button>}
          {this.state.pause &&
          <button type="button" style={{width: '150px'}} onClick={this.createStream}>{"create stream"}</button>}
        </div>
        }
        {this.state.loaded &&
        <div>
          <button type="button" style={{width: '100px'}} onClick={this.handleZoomIn}>{"zoom in"}</button>
          <button type="button" style={{width: '100px'}} onClick={this.handleZoomOut}>{"zoom out"}</button>
        </div>
        }
      </div>
    );
  }
}
