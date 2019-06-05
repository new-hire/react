import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import App from "./component/App";
import NewPost from "./component/NewPostComponent";
const initialState = {
  components: []
};

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  addComponent = (post) => {
    const components = this.state.components;
    components.push(post);
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
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <App {...props} components={this.state.components} removeComponent={this.removeComponent} />} />
          <Route path="/new-post" render={(props) => <NewPost {...props} addComponent={this.addComponent} />} />
        </Switch>
      </Router>
    );
  }
}
