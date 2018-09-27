/* Action Types */

export const Types = {
    LOADING          : 'SHARED/LOADING',
    ACTION_FAILURE   : 'SHARED/ACTION_FAILURE'
}

const INITIAL_STATE = {
    loading : false,
    error   : null
}

/* Action Creators */
export const Creators = {
     /**
    * @description Retorna a ação de LOADING
    */
    loading:(loading) => ({
        type: Types.LOADING,
        loading
    }),
     /**
    * @description Retorna a ação de ACTION_FAILURE
    */
    failure:(error) => ({
        type: Types.ACTION_FAILURE,
        error
    })
}

/* Reducer */
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

