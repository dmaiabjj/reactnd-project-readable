import { createActions, createReducer } from "reduxsauce"

const INITIAL_STATE = {}

export const {Types, Creators} = createActions({
        fetchPostSuccess:["response"],
        fetchPostFailure:["comments"],
        addPost:["response"]
});

const fetchSuccess = (state = {},action) => {
    return {
        ...state,
        ...action.response.entities.comments,
    }
};


/*const fetchFailure = (state = {},action) => {
    return {
        ...state,
        ...action.response.entities.posts,
    }
};
*/

const add = (state = INITIAL_STATE,action) => {
    return {
        ...state,
        ...action.response.entities.comments,
    }
};


export default createReducer(INITIAL_STATE,{
    [Types.FETCH_POST_SUCCESS] : fetchSuccess,
    //[Types.FETCH_POST_FAILURE] : fetchFailure,
    [Types.ADD_POST] : add
});




