import {createStore } from "redux"

import reducers from "./features"

const store = createStore(reducers)


export default store;