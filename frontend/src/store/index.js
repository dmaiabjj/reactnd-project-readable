import {createStore,compose} from 'redux'
import middlewares from '../middlewares'
import reducer from "./features"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
    middlewares,
  // other store enhancers if any
);
const store = createStore(reducer, enhancer);

export default store;