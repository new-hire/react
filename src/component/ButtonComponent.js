import React from 'react';

export default class ButtonComponent extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        {this.props.add && <button type="button" style={{width: '100px'}} onClick={this.props.add}>{"Add Post"}</button>}
        {this.props.remove && <button type="button" style={{width: '100px'}} onClick={this.props.remove}>{"Remove Post"}</button>}
      </div>
    );
  }
}