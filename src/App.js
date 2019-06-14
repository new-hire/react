import React from 'react';
import UploadImage from './component/UploadImage';

const initialState = {
  loaded: false
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.zoomRatio = 0.0;
    this.state = initialState;
  }

  componentDidMount() {
    this.canvas.addEventListener('mousewheel', this.handleScroll);
    this.canvas.addEventListener('DOMMouseScroll', this.handleScroll);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousewheel', this.handleScroll);
    this.canvas.removeEventListener('DOMMouseScroll', this.handleScroll);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
  }
  handleMouseMove = (e) => {
  };
  handleScroll = (e) => {
    const delta = e.wheelDelta ? e.wheelDelta : e.detail ? -e.detail : 0;
    if (delta > 0)
      this.handleZoomIn(e);
    else
      this.handleZoomOut(e);
  };
  handleZoomIn = (e) => {
    if (!this.state.loaded)
      return;
    if (this.zoomRatio + 0.1 > 1)
      return;
    this.zoomRatio += 0.1;
    const area = this.getScale(this.img, (1 + this.zoomRatio));
    this.canvas.width = area.w;
    this.canvas.height = area.h;
    this.canvas.getContext('2d').drawImage(this.img, area.zx, area.zy, area.zw, area.zh);
  };
  handleZoomOut = (e) => {
    if (!this.state.loaded)
      return;
    if (this.zoomRatio - 0.1 < -1)
      return;
    this.zoomRatio -= 0.1;
    const area = this.getScale(this.img, (1 + this.zoomRatio));
    this.canvas.width = area.w;
    this.canvas.height = area.h;
    this.canvas.getContext('2d').drawImage(this.img, area.zx, area.zy, area.zw, area.zh);
  };
  getScale = (image, scale = 1) => {
    const area = {};
    const sScale = 640 / 480;
    const imageScale = image.width / image.height;
    if (imageScale > sScale) {
      area.w = image.width;
      area.h = Math.round(image.width / sScale);
      area.x = 0;
      area.y = Math.round((area.h - image.height) / 2);
      area.zw = Math.round(image.width * scale);
      area.zh = Math.round(image.height * scale);
      area.zx = Math.round((area.w - area.zw) / 2);
      area.zy = Math.round((area.h - area.zh) / 2);
    } else {
      area.w = Math.round(image.height * sScale);
      area.h = image.height;
      area.x = Math.round((area.w - image.width) / 2);
      area.y = 0;
      area.zw = Math.round(image.width * scale);
      area.zh = Math.round(image.height * scale);
      area.zx = Math.round((area.w - area.zw) / 2);
      area.zy = Math.round((area.h - area.zh) / 2);
    }
    return area;
  };
  handleUploadFile = (file) => {
    const r = new FileReader();
    r.onload = event => {
      this.img = new Image();
      this.img.onload = () => {
        const area = this.getScale(this.img);
        this.canvas.width = area.w;
        this.canvas.height = area.h;
        this.canvas.getContext('2d').drawImage(this.img, area.x, area.y);
      };
      this.img.src = event.target.result;
      this.setState(ps => ({...ps}));
    };
    r.readAsDataURL(file);
    this.setState(ps => ({...ps, loaded: true}));
    this.zoomRatio = 0.0;
  };
  handleClick = () => {
    this.uploadImage.click();
  };

  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <canvas ref={r => this.canvas = r} style={{width: '640px', height: '480px', border: "1px solid black"}}/>
        <br/>
        <UploadImage ref={r => this.uploadImage = r} callback={this.handleUploadFile}/>
        {!this.state.loaded && <button type="button" style={{width: '100px'}} onClick={this.handleClick}>{"upload"}</button>}
        {this.state.loaded && <button type="button" style={{width: '100px'}} onClick={this.handleZoomIn}>{"zoom in"}</button>}
        {this.state.loaded && <button type="button" style={{width: '100px'}} onClick={this.handleZoomOut}>{"zoom out"}</button>}
      </div>
    );
  }
}
