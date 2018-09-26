export const Types = {
    LOADING          : "SHARED/LOADING",
    ACTION_FAILURE   : "SHARED/ACTION_FAILURE"
}

const INITIAL_STATE = {
    loading : false,
    error   : null
}

export const Creators = {
    loading:(loading) => ({
        type: Types.LOADING,
        loading
    }),
    failure:(error) => ({
        type: Types.ACTION_FAILURE,
        error
    })
}

export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.LOADING:
            return action.loading
        case Types.ACTION_FAILURE: 
            return action.error
        default:
            return state
    }
}

