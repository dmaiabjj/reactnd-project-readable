import { getAllCategories } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'

export const Types = {
    FETCH           : "CATEGORIES/FETCH",
    FETCH_SUCCESS   : "CATEGORIES/FETCH_SUCCESS"
}

const INITIAL_STATE = []


export const Creators = {
    fetch:() => {
        SharedCreators.loading(true);
        return (dispatch) => {
            return getAllCategories()
              .then((categories) => dispatch(Creators.fetchSuccess(categories)))
              .then(() => dispatch(SharedCreators.loading(false)))
              .catch(function(error) {
                dispatch(SharedCreators.failure(error))
              });
          }
    },
    fetchSuccess:(categories) => {
        return {
            type: Types.FETCH_SUCCESS,
            categories
        }
    }
}


export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.FETCH_SUCCESS:
            return action.categories
        default:
            return state
    }
}

