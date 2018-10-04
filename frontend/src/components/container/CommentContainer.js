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
    onHandleComment = (comment) => {
        this.setState({comment})
    }

    render() {
       
        const {comment} = this.state
        const {post,user,addComment,updateComment} = this.props
        return (
                <Fragment>
                    {post
                        && 
                        <Fragment>
                            <CommentList 
                                postId={post.id} 
                                onHandleComment={this.onHandleComment} 
                            />
                            <CommentForm 
                                comment={comment} 
                                user={user} 
                                onAddComment={addComment} 
                                onUpdateComment={updateComment}
                            />
                        </Fragment>
                    }
                </Fragment>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        addComment: (comment,event) => {
            event.preventDefault();
            dispatch(CommentCreators.add(comment))
        },
        updateComment: (comment,event) => {
            event.preventDefault();
            dispatch(CommentCreators.update(comment))
        }
    }
}

export default withRouter(connect(null,mapDispatchToProps)(CommentContainer))

