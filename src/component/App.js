import React from 'react';
import DisplayComponent from './DisplayComponent';
import ButtonComponent from './ButtonComponent';
import {withRouter} from "react-router";
const initialState = {
};

export default withRouter(class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <ButtonComponent add={() => this.props.history.push('/new-post')} remove={this.props.removeComponent}/>
        <br />
        {this.props.components.map((item, index) =>
          <DisplayComponent item={item} key={index}/>
        )}
      </div>
    );
  }
})
