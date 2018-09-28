import { getAllPosts } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'
import { createSelector } from 'reselect'
import _ from 'lodash'
/* Action Types */
export const Types = {
    FETCH           : 'POSTS/FETCH',
    FETCH_SUCCESS   : 'POSTS/FETCH_SUCCESS',
    ADD             : 'POSTS/ADD',
    ADD_SUCCESS     : 'POSTS/ADD_SUCCESS'
}

const INITIAL_STATE = {}

/* Action Creators */
export const Creators = {
    /**
    * @description Executa a api buscando todos os posts cadastrados.
    * Step 1 - Sucesso - Dispacha a ação de FETCH_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    * Step Padrão      - Dispacha a ação negando o loading
    */
    fetch:() => {
        return (dispatch) => {
            SharedCreators.loading(true);
            return getAllPosts()
              .then((posts) => dispatch(Creators.fetchSuccess(posts)))
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
                ...action.posts,
            }
        default:
            return state
    }
}


/* Selectors */

const postsEntitiesSelector = state => state.posts


export const getPosts = (category = 'all',filter = 'timestamp',order = 'desc') => {
    return createSelector(
        postsEntitiesSelector,
        (posts) => {
            return posts &&  _.orderBy(Object.keys(posts)
            .map(id => posts[id])
            .filter(post => category === 'all' || post.category === category),[filter],[order])
        } 
    )
}


/* 
export const getPosts = (filter = 'timestamp') => {
    return createSelector(
        postsEntitiesSelector,
        (posts) => {
            return posts &&  Object.keys(posts)
            .sort((a,b) => posts[b][`${filter}`] - posts[a][`${filter}`])
            .reduce((acc,curr) => ({
                ...acc, [curr.id] : posts[curr.id]
            }),{})
        } 
    )
}
 */