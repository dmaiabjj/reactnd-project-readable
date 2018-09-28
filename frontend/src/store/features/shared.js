import { getInitialData  } from '../../utilities/api'
import { Creators as CategoryCreators} from './category'
import { Creators as PostCreators} from './post'

import { normalize } from 'normalizr';
import PostSchema  from '../schemas/posts';

/* Action Types */
export const Types = {
    LOADING             : 'SHARED/LOADING',
    ACTION_FAILURE      : 'SHARED/ACTION_FAILURE'
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
    }),
     /**
    * @description Executa a api buscando os dados iniciais.
    * Step 1 - Sucesso - Dispacha a ação de FETCH_SUCCESS dos posts e categories
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    * Step Padrão      - Dispacha a ação negando o loading
    */
    handleInitialData () {
        return (dispatch) => {
            dispatch(Creators.loading(true))
            return getInitialData()
                .then(({ categories, posts }) => {
                    
                    const normalized = normalize(posts,PostSchema);
                    const entities   = {entities : normalized.entities.posts,ids:normalized.result}
                    dispatch(CategoryCreators.fetchSuccess(categories))
                    dispatch(PostCreators.fetchSuccess(entities))
                    dispatch(Creators.loading(false))
                }) 
                .catch(function(error) {
                    dispatch(Creators.failure(error))
                });
        }
    }
}

/* Reducer */
export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.LOADING:
            return {...state,loading: action.loading}
        case Types.ACTION_FAILURE: 
        return {...state,error: action.error}
        default:
            return state
    }
}

