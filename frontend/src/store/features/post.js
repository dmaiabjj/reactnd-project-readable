import {addPost,updatePost, getAllPosts,getPostByPostId,deletePost,upOrDownPostVote, reactPost } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'
import { Types as CommentTypes} from './comment'
import { createSelector } from 'reselect'
import _ from 'lodash'

import { normalize } from 'normalizr';
import PostSchema  from '../schemas/posts';


/* Action Types */
export const Types = {
    FETCH           : 'POSTS/FETCH',
    FETCH_SUCCESS   : 'POSTS/FETCH_SUCCESS',
    FETCH_BY_ID     : 'POSTS/FETCH_BY_ID',
    VOTE            : 'POSTS/VOTE',
    VOTE_SUCCESS    : 'POSTS/VOTE_SUCCESS',
    REACT           : 'POSTS/REACT',
    REACT_SUCCESS   : 'POSTS/REACT_SUCCESS',
    ADD             : 'POSTS/ADD',
    ADD_SUCCESS     : 'POSTS/ADD_SUCCESS',
    UPDATE          : 'POSTS/UPDATE',
    UPDATE_SUCCESS  : 'POSTS/UPDATE_SUCCESS',
    DELETE          : 'POSTS/DELETE',
    DELETE_SUCCESS  : 'POSTS/DELETE_SUCCESS'
}

const INITIAL_STATE = {}

/* Action Creators */
export const Creators = {
    /**
    * @description Executa a api buscando todos os posts cadastrados.
    * Step 1 - Sucesso - Dispacha a ação de FETCH_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
    fetch:() => {
        return (dispatch) => {
            dispatch(SharedCreators.loading(true));
            return getAllPosts()
              .then((posts) => {
                const normalized = normalize(posts,PostSchema);
                dispatch(Creators.fetchSuccess(normalized.entities.posts))
              })
              .catch(function(error) {
                dispatch(SharedCreators.failure(error))
              });
          }
    },
     /**
    * @description Executa a api buscando buscando o post do id passado.
    * Step 1 - Sucesso - Dispacha a ação de FETCH_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   fetchById:(id) => {
    return (dispatch) => {
        dispatch(SharedCreators.loading(true));
        return getPostByPostId(id)
          .then((post) => {
            const normalized = normalize([post],PostSchema);
            dispatch(Creators.fetchSuccess(normalized.entities.posts))
          })
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
    }),
     /**
    * @description Executa a api vote com up or down do post.
    * Step 1 - Sucesso - Dispacha a ação de DELETE_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   react:(id,user,option) => {
    return (dispatch) => {
         return reactPost(id,user,option)
          .then((post) => {
              dispatch(Creators.reactSuccess(post.id,post.reactions))
          })
          .catch(function(error) {
            dispatch(SharedCreators.failure(error))
          });
      }
    },
    /**
    * @description Retorna a ação de VOTE_SUCCESS
    */
   reactSuccess:(id,reactions) => ({
        type: Types.REACT_SUCCESS,
        id,
        reactions
    }),
    /**
    * @description Executa a api vote com up or down do post.
    * Step 1 - Sucesso - Dispacha a ação de DELETE_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   vote:(id,user,option) => {
    return (dispatch) => {
         return upOrDownPostVote(id,user,option)
          .then((post) => {
              dispatch(Creators.voteSuccess(post.id,post.votes))
          })
          .catch(function(error) {
            dispatch(SharedCreators.failure(error))
          });
      }
    },
    /**
    * @description Retorna a ação de VOTE_SUCCESS
    */
   voteSuccess:(id,votes) => ({
        type: Types.VOTE_SUCCESS,
        id,
        votes
    }),
     /**
    * @description Executa a api adicionando o post.
    * Step 1 - Sucesso - Dispacha a ação de ADD_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   add:(post) => {
    return (dispatch) => {
        dispatch(SharedCreators.loading(true));
         return addPost(post)
          .then((result) => {
              dispatch(Creators.addSuccess(result))
            })
          .catch(function(error) {
            dispatch(SharedCreators.failure(error))
          });
      }
    },
    /**
    * @description Retorna a ação de ADD_SUCCESS
    */
   addSuccess:(post) => ({
        type: Types.ADD_SUCCESS,
        post
    }),
    /**
    * @description Executa a api atualizando o post.
    * Step 1 - Sucesso - Dispacha a ação de UPDATE_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
    update:(post) => {
        return (dispatch) => {
            dispatch(SharedCreators.loading(true));
            return updatePost(post)
            .then((result) => { 
                dispatch(Creators.updateSuccess(result))
            })
            .catch(function(error) {
                dispatch(SharedCreators.failure(error))
            });
        }
    },
    /**
    * @description Retorna a ação de UPDATE_SUCCESS
    */
    updateSuccess:(post) => ({
        type: Types.UPDATE_SUCCESS,
        post
    }),
     /**
    * @description Executa a api deletando o post.
    * Step 1 - Sucesso - Dispacha a ação de DELETE_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   delete:(id,history) => {
    return (dispatch) => {
        dispatch(SharedCreators.loading(true));
         return deletePost(id)
            .then((post) =>{
                dispatch(Creators.deleteSuccess(post.id))
                history && history.push('/')
            }
            ).catch(function(error) {
              console.log(error)
            dispatch(SharedCreators.failure(error))
          });
      }
    },
    /**
    * @description Retorna a ação de DELETE_SUCCESS
    */
   deleteSuccess:(id) => ({
        type: Types.DELETE_SUCCESS,
        id
    })
}


/* Reducer */
export default function reducer(state = INITIAL_STATE,action)
{
   
    switch(action.type){
        case CommentTypes.ADD_SUCCESS:{
            return {
                ...state,
                [action.comment.parentId] :{
                    ...state[action.comment.parentId],...{commentCount:state[action.comment.parentId].commentCount + 1}
                }
            }
        }
        case Types.FETCH_SUCCESS:
            return {
                ...state,
                ...action.posts,
            }
        case Types.REACT_SUCCESS:
            return {
                ...state,
                [action.id] : {
                    ...state[action.id],...{reactions : [...action.reactions]}
                } 
            }
            case Types.VOTE_SUCCESS:
            return {
                ...state,
                [action.id] : {
                    ...state[action.id],...{votes : [...action.votes]}
                } 
            }
        case Types.DELETE_SUCCESS:
            return _.omit(state, action.id);
        default:
            return state
    }
}


/* Selectors */

const postsEntitiesSelector = state => state.posts


/**
* @description          
* Filtras os posts através dos filtros passados
*
* @param   {String} category    Categoria
* @param   {String} filter      Filtro
* @param   {String} order       Ordenação
* @returns {Function}           Retorna uma função que recebe o state e faz o filtro dos posts pelo category, filter e order
*/
export const getPostByFilter = (category = 'all',filter='timestamp',order='asc') => {
    return createSelector(
        postsEntitiesSelector,
        (posts) => {
            return posts &&  _.orderBy(Object.keys(posts)
            .map(id => posts[id])
            .filter(post => category === 'all' || post.category === category),[filter],[order])
        } 
    )
}

/**
* @description          
* Busca um post especifico
*
* @param   {Number} id      Id do post
* @returns {Function}       Retorna uma função que recebe o state e faz o filtro dos comments pelo postID
*/
export const getPostById = (id) => {
    return createSelector(
        postsEntitiesSelector,
        (posts) => {
            return posts && posts[id]
        } 
    )
}


