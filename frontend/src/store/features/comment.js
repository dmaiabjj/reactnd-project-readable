import { getCommentsByPostId,addComment,updateComment,deleteComment,upOrDownCommentVote   } from '../../utilities/api'
import { Creators as SharedCreators} from './shared'
import { createSelector } from 'reselect'

import _ from 'lodash'
import { normalize } from 'normalizr';
import CommentSchema  from '../schemas/comments';

/* Action Types */
export const Types = {
    FETCH           : 'COMMENTS/FETCH',
    FETCH_SUCCESS   : 'COMMENTS/FETCH_SUCCESS',
    ADD             : 'COMMENTS/ADD',
    ADD_SUCCESS     : 'COMMENTS/ADD_SUCCESS',
    UPDATE          : 'COMMENTS/UPDATE',
    UPDATE_SUCCESS  : 'COMMENTS/UPDATE_SUCCESS',
    VOTE            : 'COMMENTS/VOTE',
    VOTE_SUCCESS    : 'COMMENTS/VOTE_SUCCESS',
    DELETE          : 'COMMENTS/DELETE',
    DELETE_SUCCESS  : 'COMMENTS/DELETE_SUCCESS'
}

const INITIAL_STATE = {}

/* Action Creators */
export const Creators = {
    /**
    * @description Executa a api buscando todos os comentários de um post específico.
    * Step 1 - Sucesso - Dispacha a ação de FETCH_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
    fetch:(postId) => {
        return (dispatch) => {
            SharedCreators.loading(true);
            return getCommentsByPostId(postId)
              .then((comments) => {
                  const normalized = normalize(comments,CommentSchema);
                  dispatch(Creators.fetchSuccess(normalized.entities.comments))
              })
              .catch(function(error) {
                dispatch(SharedCreators.failure(error))
              });
          }
    },
    /**
    * @description Retorna a ação de FETCH_SUCCESS
    */
    fetchSuccess:(comments) => ({
        type: Types.FETCH_SUCCESS,
        comments
    }),
      /**
    * @description Executa a api adicionando o comment.
    * Step 1 - Sucesso - Dispacha a ação de ADD_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   add:(comment) => {
    return (dispatch) => {
         return addComment(comment)
          .then((result) => dispatch(Creators.addSuccess(result)))
          .catch(function(error) {
            dispatch(SharedCreators.failure(error))
          });
      }
    },
    /**
    * @description Retorna a ação de ADD_SUCCESS
    */
   addSuccess:(comment) => ({
        type: Types.ADD_SUCCESS,
        comment
    }),
      /**
    * @description Executa a api atualizando o comment.
    * Step 1 - Sucesso - Dispacha a ação de UPDATE_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
    update:(comment) => {
        return (dispatch) => {
            return updateComment(comment.id,comment.timestamp,comment.body)
            .then((result) => dispatch(Creators.updateSuccess(result)))
            .catch(function(error) {
            dispatch(SharedCreators.failure(error))
            });
        }
    },
    /**
    * @description Retorna a ação de UPDATE_SUCCESS
    */
   updateSuccess:(comment) => ({
        type: Types.UPDATE_SUCCESS,
        comment
    }),
    /**
    * @description Executa a api vote com up or down o comment.
    * Step 1 - Sucesso - Dispacha a ação de DELETE_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   vote:(id,user,option) => {
    return (dispatch) => {
         return upOrDownCommentVote(id,user,option)
          .then((comment) => dispatch(Creators.voteSuccess(comment.id,comment.votes)))
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
    * @description Executa a api deletando o comment.
    * Step 1 - Sucesso - Dispacha a ação de DELETE_SUCCESS
    * Step 2 - Falha   - Dispacha a ação de FAILURE
    */
   delete:(id) => {
    return (dispatch) => {
         return deleteComment(id)
          .then((comment) => {
              dispatch(Creators.deleteSuccess(comment.id))
            })
          .catch(function(error) {
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
        case Types.ADD_SUCCESS:
        case Types.UPDATE_SUCCESS:
            return {
                ...state,
                [action.comment.id] : action.comment,
            }
        case Types.FETCH_SUCCESS:
            return {
                ...state,
                ...action.comments,
            }
        case Types.VOTE_SUCCESS:
            return {
                ...state,
                ...state[action.id].votes = [...action.votes]
            }
        case Types.DELETE_SUCCESS:
            return _.omit(state, action.id);
        default:
            return state
    }
}


/* Selectors */

const commentsEntitiesSelector = state => {
    return state.comments
}


/**
* @description          
* Busca os comentários de um post especifico
*
* @param   {Number} postId  Id do post
* @returns {Function}     Retorna uma função que recebe o state e faz o filtro dos comments pelo postID
*/

export const getCommentsByPost = (postId) => {
    return createSelector(
        commentsEntitiesSelector,
        (comments) => {
            return comments &&  _.orderBy(Object.keys(comments)
            .map(id => comments[id])
            .filter(comment => comment.parentId === postId),['timestamp'],['desc'])
        } 
    )
}

