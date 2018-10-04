import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import CommentDetail from '../presentational/CommentDetail';

import {Creators as CommentCreators,getCommentsByPost} from '../../store/features/comment'

const propTypes = {
    postId : PropTypes.string.isRequired,
    onHandleComment : PropTypes.func.isRequired
};



/**
* @description 
* Componente que representa a lista de comentários do post carregado
* @param {String} postId                Id do post atual
* @param {Function} onHandleComment     Função que atualiza ou adiciona um novo comentário ao post
*/
class CommentList extends PureComponent {

    componentDidMount() {
        const { postId,getComments} = this.props;
        getComments(postId)
    }

    /**
    * @description Seta o comment a ser atualizado e enviado ao form com o parentId do post em questão.
    *
    * @param   {Object} comment  Comentário
    * @param   {Event} event     Evento
    */
    onBindComment = (comment,event) => {
        event.preventDefault()
        const { postId,onHandleComment} = this.props;
        onHandleComment({
            ...comment,parentId : postId
        }); 
    }

    render() {
        const { comments,authUser,deleteComment,voteComment} = this.props
        return (
            <div className="ui-block">
                <div className="crumina-module crumina-heading with-title-decoration">
                    <h5 className="heading-title">Comments ({comments.length})</h5>
                </div>
                <ul className="comments-list">
                    {comments 
                        && 
                        comments.map(comment => (
                            <CommentDetail 
                                key={comment.id} 
                                comment={comment} 
                                isOwner={comment.author === authUser.name} 
                                onDeleteComment={deleteComment} 
                                onBindComment={this.onBindComment} 
                                onVoteComment={voteComment}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }

}

function mapStateToProps (state,ownProps) {
    const {user}    = state;
    const {postId}  = ownProps;
    return {
        comments : getCommentsByPost(postId)(state),
        authUser : user
    }
}
    
function mapDispatchToProps (dispatch) {
    return {
        deleteComment: (id,event) => {
            event.preventDefault();
            console.log(id)
            dispatch(CommentCreators.delete(id))
        },
        voteComment: (id,user,option,event) => {
            event.preventDefault();
            dispatch(CommentCreators.vote(id,user,option))
        },
        getComments: (id)              =>  {
            dispatch(CommentCreators.fetch(id));
        },
    }
}


CommentList.propTypes    = propTypes;

export default connect(mapStateToProps,mapDispatchToProps)(CommentList)