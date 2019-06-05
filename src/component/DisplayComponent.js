import React from 'react';
export default class DisplayComponent extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    console.log(this.props.item);
    return (
      <div style={{width: '50%', margin: '10px auto', borderStyle: 'dashed'}}>
        {
          this.props.item.title &&
          <div>
            {this.props.item.title}
          </div>
        }
        {
          this.props.item.content &&
          <div>
            {this.props.item.content}
          </div>
        }
        {
          this.props.item.imageUrl &&
          <img src={this.props.item.imageUrl} alt={"preview"} style={{width: '100px', height: '100px', objectFit: 'contain'}}/>
        }
      </div>
    );
  }
}