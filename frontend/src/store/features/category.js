import { getAllCategories } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'

/* Action Types */
export const Types = {
    FETCH           : 'CATEGORIES/FETCH',
    FETCH_SUCCESS   : 'CATEGORIES/FETCH_SUCCESS'
}

const INITIAL_STATE = []

/* Action Creators */
export const Creators = {
    /**
    * @description Executa a api buscando todas as categorias de posts cadastradas.
    * Step 1 - Sucesso - Dispacha a ação de FETCH_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    * Step Padrão      - Dispacha a ação negando o loading
    */
    fetch:() => {
        SharedCreators.loading(true);
        return (dispatch) => {
            return getAllCategories()
              .then((categories) => dispatch(Creators.fetchSuccess(categories)))
              .catch(function(error) {
                dispatch(SharedCreators.failure(error))
              });
          }
    },
    /**
    * @description Retorna a ação de FETCH_SUCCESS
    */
    fetchSuccess:(categories) => {
        return {
            type: Types.FETCH_SUCCESS,
            categories
        }
    }
}

/* Reducer */
export default function reducer(state = INITIAL_STATE,action)
{
    switch(action.type){
        case Types.FETCH_SUCCESS:
            return action.categories
        default:
            return state
    }
}

