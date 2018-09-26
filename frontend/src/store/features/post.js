import { getAllPosts } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'

export const Types = {
    FETCH           : "POSTS/FETCH",
    FETCH_SUCCESS   : "POSTS/FETCH_SUCCESS",
    ADD             : "POSTS/ADD",
    ADD_SUCCESS     : "POSTS/ADD_SUCCESS"
}

const INITIAL_STATE = {}


export const Creators = {
    fetch:() => {
        return (dispatch) => {
            return getAllPosts()
              .then((posts) => dispatch(Creators.fetchSuccess(posts)))
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
    /*,
    add:(post) => {
        return (dispatch) => {
            dispatch(fetchSuccess(post))
            return addPost(post)
              .then(() => dispatch(SharedCreators.loading(false)))
              .catch(function(error) {
                dispatch(SharedCreators.failure(error))
              });
          }
    },
    addSuccess:(post) => ({
        type: Types.ADD_SUCCESS,
        post
    })*/
}



export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.FETCH_SUCCESS:
            return {
                ...state,
                ...action.posts,
            }
        default:
            return state
    }
}

