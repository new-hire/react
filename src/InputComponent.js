import React from 'react';

export default class InputComponent extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  handleSubmit = () => {
    this.props.setDisplayName({displayName: this.displayName.value});
  };
  render() {
    return (
      <div>
        <input type="text" ref={r => this.displayName = r} name="displayName" maxLength={50} style={{width: '30%'}}/>
        <br />
        <button type="button" style={{width: '100px'}} onClick={this.handleSubmit}>{"submit"}</button>
      </div>
    );
  }
}
