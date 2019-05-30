import React from 'react';
export default class DisplayComponent extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div>
        Welcome {this.props.displayName}
      </div>
    );
  }
}
