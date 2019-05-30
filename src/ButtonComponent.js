import React from 'react';

export default class ButtonComponent extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        <button type="button" style={{width: '100px'}} onClick={this.props.add}>{"Add Component"}</button>
        <button type="button" style={{width: '100px'}} onClick={this.props.remove}>{"Remove Component"}</button>
      </div>
    );
  }
}
