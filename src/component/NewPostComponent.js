import React from 'react';
import {withRouter} from 'react-router-dom';

const initialState = {
  file: null
};

export default withRouter(class NewPostComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  handleSubmit = () => {
    const postData = {title: this.title.value, content: this.content.value, imageUrl: this.state.file};
    console.log(postData);
    this.props.addComponent(postData);
    this.props.history.push('/');
  };
  handleFile = (e) => {
    const file = e.target.files[0];
    const imgSrc = URL.createObjectURL(file);
    this.setState({file: imgSrc});
  };
  handleUpload = () => {
    this.upload.click();
  };
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <div>
          <span style={{padding: '10px 0', display: 'grid', justifyContent: 'center', alignItems: 'center'}}>Title:</span>
          <input type="text" ref={r => this.title = r} name="title" maxLength={10} style={{width: '20%'}}/>
        </div>
        <div>
          <span style={{padding: '10px 0', display: 'grid', justifyContent: 'center', alignItems: 'center'}}>Content:</span>
          <textarea cols="50" rows="5" ref={r => this.content = r} name='content'
                    defaultValue={'Please input Content.'}/>
        </div>
        {this.state.file &&
          <div>
            <span style={{padding: '10px 0', display: 'grid', justifyContent: 'center', alignItems: 'center'}}>Image Preview:</span>
            <img src={this.state.file} alt={"preview"} style={{width: '100px', height: '100px', objectFit: 'contain'}}/>
          </div>
        }
        <br />
        <input type="file" ref={r => this.upload = r} onChange={this.handleFile} accept="image/*" hidden/>
        <button type="button" style={{width: '100px'}} onClick={this.handleUpload}>{"upload"}</button>
        <button type="button" style={{width: '100px'}} onClick={this.handleSubmit}>{"submit"}</button>
      </div>
    );
  }
})
