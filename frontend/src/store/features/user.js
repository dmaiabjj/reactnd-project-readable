export const Types = {
    FETCH           : "USER/FETCH"
}

const INITIAL_STATE = {name:"Udacity", avatar:"udacity"}


export const Creators = {
    fetch:() => ({
        type: Types.FETCH,
        user : INITIAL_STATE
    })
}


export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.FETCH:
            return action.user
        default:
            return state
    }
}





