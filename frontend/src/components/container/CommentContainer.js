import React,{PureComponent,Fragment} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CommentList from '../container/CommentList';
import CommentForm from '../presentational/CommentForm';

import {Creators as CommentCreators} from '../../store/features/comment'

/**
*@description 
*Componente que representa a Sessão referente a comentários
* @param {String} postId                    Id do Post referente aos comentários
* @param {Object} user                      Usuário logado
*/
class CommentContainer extends PureComponent {

    state = {
        comment: undefined
    }
    
    /**
    * @description Seta o comment a ser atualizado e enviado ao form.
    * @param   {Object} comment  Comentário
    */
    onHandleSetComment = (comment) => {
        this.setState({comment})
    }


    /**
    * @description 
    * Faz o bind do objeto comentário para realizar a inserção ou atualização
    * @param {Event} event  Evento do click do botão
    */
   onHandleComment = (comment) =>{
        const {addComment,updateComment} = this.props 
        if(comment.is_new)
            addComment(comment);
        else
            updateComment(comment);
    }

    render() {
       
        const {comment} = this.state
        const {postId,user} = this.props
        return (
                <Fragment>
                    {postId
                        && 
                        <Fragment>
                            <CommentList 
                                postId={postId} 
                                onHandleSetComment={this.onHandleSetComment} 
                            />
                            <CommentForm 
                                postId={postId}
                                comment={comment} 
                                user={user} 
                                onHandleComment={this.onHandleComment} 
                            />
                        </Fragment>
                    }
                </Fragment>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addComment: (comment) => {
            dispatch(CommentCreators.add(comment))
        },
        updateComment: (comment) => {
            dispatch(CommentCreators.update(comment))
        }
    }
}

export default withRouter(connect(null,mapDispatchToProps)(CommentContainer))

