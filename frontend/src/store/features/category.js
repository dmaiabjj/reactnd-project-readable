import { createActions, createReducer } from "reduxsauce"

const INITIAL_STATE = []

export const {Types, Creators} = createActions({
        receiveCategory:["categories"]
});

const receive = (state = INITIAL_STATE,action) => [
    action.categories
];

export default createReducer(INITIAL_STATE,{
    [Types.RECEIVE_CATEGORY] : receive
});




