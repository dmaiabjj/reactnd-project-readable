import React, { Component } from 'react';
import { Link, Route } from "react-router-dom";
import routes from "../../routes";

class App extends Component {
  render() {
    return (
      <div className="App">
      { routes.map( route => (
          <Route key={ route.path } { ...route } />
      ) ) }
      </div>
    );
  }
}

export default App;
