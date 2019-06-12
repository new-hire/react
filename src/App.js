import React from 'react';
import UploadImage from './component/UploadImage';

const initialState = {
  displayName: 'defaultValue'
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }

  handleUploadFile = (file) => {
    const r = new FileReader();
    r.onload = event => {
      const img = new Image();
      img.onload = () => {
        this.canvas.width = img.width;
        this.canvas.height = img.height;
        this.canvas.getContext('2d').drawImage(img, 0, 0);
      };
      img.src = event.target.result;
    };
    r.readAsDataURL(file);
  };
  handleClick = () => {
    this.uploadImage.click();
  };
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <canvas ref={r => this.canvas = r} />
        <br />
        <UploadImage ref={r => this.uploadImage = r} callback={this.handleUploadFile}/>
        <button type="button" style={{width: '100px'}} onClick={this.handleClick}>{"upload"}</button>
      </div>
    );
  }
}
