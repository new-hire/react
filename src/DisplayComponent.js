import React from 'react';
export default class DisplayComponent extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div style={{width: '50%', height: '20px', margin: '10px auto', borderStyle: 'dashed'}}>
        {this.props.name + ' ' + this.props.index}
      </div>
    );
  }
}
