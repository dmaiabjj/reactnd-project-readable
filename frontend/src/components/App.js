import React, {Fragment } from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './Home';
import Post from './Post';
import AddPost from './AddPost';
import store from '../store'



/**
* @description 
* Componente principal da App
* @constructor
*/
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Fragment>
        <Route path="/" exact component={Home} />
        <Route path="/post/add" component={AddPost} />
        <Route path="/post/category/:id" component={Home} />
        <Route path="/post/id" component={Post} />
        </Fragment>
    </BrowserRouter>
  </Provider>
);

export default App;
