import { getInitialData  } from '../../utilities/api'
import { Creators as CategoryCreators, Types as CategoryTypes} from './category'
import { Creators as PostCreators, Types as PostTypes} from './post'

import { normalize } from 'normalizr';
import PostSchema  from '../schemas/posts';

/* Action Types */
export const Types = {
    LOADING             : 'SHARED/LOADING',
    ACTION_FAILURE      : 'SHARED/ACTION_FAILURE'
}

const INITIAL_STATE = {
    loading : false,
    error   : null,
    fetched : false
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
                    dispatch(CategoryCreators.fetchSuccess(categories))
                    dispatch(PostCreators.fetchSuccess(normalized.entities.posts))
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
        case PostTypes.FETCH_SUCCESS:
            return {...state,loading: false,fetched:true}
        case CategoryTypes.FETCH_SUCCESS:
            return {...state,loading: false}
        case Types.LOADING:
            return {...state,loading: action.loading,fetched:false}
        case Types.ACTION_FAILURE: 
        return {...state,loading:false,error: action.error,fetched:true}
        default:
            return state
    }
}

