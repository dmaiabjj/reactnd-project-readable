/* Action Types */
export const Types = {
    FETCH : 'USER/FETCH'
}

const INITIAL_STATE = {name:'Udacity', avatar:'udacity'};

/* Action Creators */
export const Creators = {
     /**
    * @description Retorna a ação de FETCH
    */
    fetch:() => ({
        type: Types.FETCH,
        user : INITIAL_STATE
    })
}

/* Reducer */
export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.FETCH:
            return action.user
        default:
            return state
    }
}





