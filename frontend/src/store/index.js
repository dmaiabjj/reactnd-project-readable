import {createStore } from 'redux'
import middleware from '../middlewares'
import reducers from "./features"

const store = createStore(reducers,middleware)


export default store;