import { getAllPosts } from '../utils/api'
import { Creators as SharedCreators} from './shared'

export const Types = {
    FETCH           : "POSTS/FETCH",
    FETCH_SUCCESS   : "POSTS/FETCH_SUCCESS"
}

const INITIAL_STATE = {}


export const Creators = {
    fetch:() => {
        return (dispatch) => {
            return getAllPosts()
              .then((posts) => dispatch(fetchSuccess(posts)))
              .then(() => dispatch(SharedCreators.loading(false)))
              .catch(function(error) {
                dispatch(SharedCreators.failure(error))
              });
          }
    },
    fetchSuccess:(posts) => ({
        type: Types.FETCH_SUCCESS,
        posts
    })
}



export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.FETCH_SUCCESS:
            return {
                ...state,
                ...action.response.entities.posts,
            }
        default:
            return state
    }
}

