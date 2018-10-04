import React,{PureComponent,Fragment} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import CommentList from '../container/CommentList';
import CommentForm from '../presentational/CommentForm';

import {Creators as CommentCreators} from '../../store/features/comment'

/**
* @description 
* Componente que representa a Sessão referente a comentários
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
        console.log(comment)
        if(comment.is_new)
            addComment(comment);
        else
            updateComment(comment);
    }

    render() {
       
        const {comment} = this.state
        const {post,user} = this.props
        return (
                <Fragment>
                    {post
                        && 
                        <Fragment>
                            <CommentList 
                                postId={post.id} 
                                onHandleSetComment={this.onHandleSetComment} 
                            />
                            <CommentForm 
                                postId={post.id}
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

