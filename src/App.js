import React from 'react';
import InputComponent from './InputComponent';
import DisplayComponent from './DisplayComponent';

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
  setDisplayName = (displayName) => {
    this.setState({...displayName});
  };
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <DisplayComponent displayName={this.state.displayName}/>
        <br />
        <InputComponent setDisplayName={this.setDisplayName}/>
      </div>
    );
  }
}
