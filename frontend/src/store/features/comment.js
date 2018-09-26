import { getCommentsByPostId } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'

export const Types = {
    FETCH           : "COMMENTS/FETCH",
    FETCH_SUCCESS   : "COMMENTS/FETCH_SUCCESS"
}

const INITIAL_STATE = {}


export const Creators = {
    fetch:(postId) => {
        return (dispatch) => {
            return getCommentsByPostId(postId)
              .then((comments) => dispatch(Creators.fetchSuccess(comments)))
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
                ...action.comments,
            }
        default:
            return state
    }
}

