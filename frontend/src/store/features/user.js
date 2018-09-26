import { createActions, createReducer } from "reduxsauce"

const INITIAL_STATE = {name:"Udacity", avatar:"udacity"}

export const {Types, Creators} = createActions({
        getAuthedUser:[]
});

const get = (state = INITIAL_STATE,action) => [
    action.user
];

export default createReducer(INITIAL_STATE,{
    [Types.GET_AUTHED_USER] : get
});




