import React from 'react';
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
  handleSubmit = () => {
    this.setState({displayName: this.displayName.value});
  };
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        Welcome {this.state.displayName}
        <br />
        <input type="text" ref={r => this.displayName = r} name="displayName" maxLength={50} style={{width: '30%'}}/>
        <br />
        <button type="button" style={{width: '100px'}} onClick={this.handleSubmit}>{"submit"}</button>
      </div>
    );
  }
}
