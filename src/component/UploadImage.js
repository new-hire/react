import React from 'react';

export default class UploadImage extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  handleFile = e => {
    const {callback} = this.props;
    const file = e.target.files[0];
    if (!file)
      return;
    if (file.type.indexOf('image/png') === -1 && file.type.indexOf('image/jpeg') === -1) {
      return;
    }
    if (callback)
      callback(file);
  };
  click = () => {
    this.upload.click();
  };

  render() {
    return (
      <div style={{display: 'none'}}>
        <input type="file" ref={r => this.upload = r} onChange={this.handleFile} accept="image/*" hidden/>
      </div>
    );
  }
}