import { getCommentsByPostId } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'

/* Action Types */
export const Types = {
    FETCH           : 'COMMENTS/FETCH',
    FETCH_SUCCESS   : 'COMMENTS/FETCH_SUCCESS'
}

const INITIAL_STATE = {}

/* Action Creators */
export const Creators = {
    /**
    * @description Executa a api buscando todos os comentários de um post específico.
    * Step 1 - Sucesso - Dispacha a ação de FETCH_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    * Step Padrão      - Dispacha a ação negando o loading
    */
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
    /**
    * @description Retorna a ação de FETCH_SUCCESS
    */
    fetchSuccess:(posts) => ({
        type: Types.FETCH_SUCCESS,
        posts
    })
}


/* Reducer */
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

