import React from 'react'
import { Provider } from 'react-redux';
import { BrowserRouter,Switch, Route  } from 'react-router-dom'
import Home from './pages/Home';
import Post from './pages/Post';
import AddPost from './pages/AddPost';
import store from '../store'



/**
* @description
* Componente principal da App
* @constructor
*/
const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/post/add" component={AddPost} />
					<Route path="/post/edit/:post_id" component={AddPost} />
					<Route path="/:category/:post_id" component={Post} />
					<Route path="/:id" component={Home} />

			</Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
