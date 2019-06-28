import React from 'react';

const initialState = {
};

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.zoomRatio = 0.0;
    this.canvasStyleWidth = 800;
    this.canvasStyleHeight = 450;
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
    if (this.zoomRatio + 0.1 > 1)
      return;
    this.zoomRatio += 0.1;
  };
  handleZoomOut = (e) => {
    if (this.zoomRatio - 0.1 < -1)
      return;
    this.zoomRatio -= 0.1;
  };
  getScale = (image, scale = 1) => {
    const area = {};
    const sScale = this.canvasStyleWidth / this.canvasStyleHeight;
    const imageScale = image.width / image.height;
    if (imageScale > sScale) {
      area.w = image.width;
      area.h = this.toEvenNumber((image.width / sScale));
      area.x = 0;
      area.y = this.toEvenNumber((area.h - image.height) / 2);
      area.zw = this.toEvenNumber(image.width * scale);
      area.zh = this.toEvenNumber(image.height * scale);
      area.zx = this.toEvenNumber((area.w - area.zw) / 2);
      area.zy = this.toEvenNumber((area.h - area.zh) / 2);
    } else {
      area.w = this.toEvenNumber(image.height * sScale);
      area.h = image.height;
      area.x = this.toEvenNumber((area.w - image.width) / 2);
      area.y = 0;
      area.zw = this.toEvenNumber(image.width * scale);
      area.zh = this.toEvenNumber(image.height * scale);
      area.zx = this.toEvenNumber((area.w - area.zw) / 2);
      area.zy = this.toEvenNumber((area.h - area.zh) / 2);
    }
    return area;
  };

  toEvenNumber = n => Math.round(parseInt(n) / 2) * 2;

  draw = (video, cameraWidth, cameraHeight) => {
    if (this.canvas && cameraWidth && cameraHeight) {
      this.area = this.getScale(this.canvas, (1 + this.zoomRatio));
      this.context = this.canvas.getContext('2d');
      this.canvas.width = cameraWidth;
      this.canvas.height = cameraHeight;
      if (this.canvas.width / this.canvas.height < this.canvasStyleWidth / this.canvasStyleHeight) {
        this.canvas.style.width = '100%';
        this.canvas.style.transform = 'scaleX(-1)';
      } else {
        this.canvas.style.height = '100%';
        this.canvas.style.transform = 'scaleX(-1)';
      }
      //this.context.drawImage(video, 0, 0, this.canvas.width, this.canvas.height);
      this.canvas.getContext('2d').drawImage(video, this.area.zx, this.area.zy, this.area.zw, this.area.zh);
    }
  };

  render() {
    const {showCanvas} = this.props;
    return (
      <div>
        {<canvas id='canvasElement' ref={r => this.canvas = r} style={{display: showCanvas ? 'block' : 'none', width: this.canvasStyleWidth + 'px', height: this.canvasStyleHeight + 'px', margin: 'auto'}}/>}
      </div>
    );
  }
}
