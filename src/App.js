import React from 'react';
import ButtonComponent from './ButtonComponent';
import DisplayComponent from './DisplayComponent';

const initialState = {
  components: [
    {name: 'Component'},
    {name: 'Component'},
    {name: 'Component'},
    {name: 'Component'},
    ]
};

const component = {name: 'New Component'};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  addComponent = () => {
    const components = this.state.components;
    components.push(component);
    this.setState({component: components});
  };
  removeComponent = () => {
    if (!this.state.components.length)
      return;
    const components = this.state.components;
    components.pop();
    this.setState({component: components});
  };
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <ButtonComponent add={this.addComponent} remove={this.removeComponent}/>
        <br />
        {this.state.components.map((item, index) =>
          <DisplayComponent name={item.name} index={index}/>
        )}
      </div>
    );
  }
}
