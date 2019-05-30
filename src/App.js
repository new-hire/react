import React from 'react';
import ButtonComponent from './ButtonComponent';
import DisplayComponent from './DisplayComponent';

const initialState = {
  components: [
    {name: 'Component', index: 0},
    {name: 'Component', index: 1},
    {name: 'Component', index: 2},
    {name: 'Component', index: 3},
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
    components.push({...component, index: components.length ? (components[components.length - 1].index + 1) : 0});
    this.setState({component: components});
  };
  removeLastComponent = () => {
    if (!this.state.components.length)
      return;
    const components = this.state.components;
    components.pop();
    this.setState({component: components});
  };
  removeFirstComponent = () => {
    if (!this.state.components.length)
      return;
    const components = this.state.components.shift();
    this.setState({component: components});
  };
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        <ButtonComponent add={this.addComponent} removeLast={this.removeLastComponent} removeFirst={this.removeFirstComponent}/>
        <br />
        {this.state.components.map((item, index) =>
          <DisplayComponent name={item.name} index={item.index} key={index}/>
        )}
      </div>
    );
  }
}
