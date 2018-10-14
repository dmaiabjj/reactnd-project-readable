import React,{PureComponent} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';


import CommentDetail from '../presentational/CommentDetail';

import {Creators as CommentCreators,getCommentsByPost} from '../../store/features/comment'

const propTypes = {
    postId : PropTypes.string.isRequired,
    onHandleSetComment : PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired
};



/**
* @description 
* Componente que representa a lista de comentários do post carregado
* @param {String} postId                    Id do post atual
* @param {Boolean} loading                  Se é necessário mostrar o loading
* @param {Function} onDeleteComment        Função apaga um comentário do post
* @param {Function} onHandleSetComment      Função que atualiza ou adiciona um novo comentário ao post
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
        const { postId,onHandleSetComment} = this.props;
        onHandleSetComment({
            ...comment,parentId : postId
        }); 
    }

    render() {
        const { comments,authUser,onDeleteComment,voteComment,loading} = this.props
        return (
            <div className="ui-block">
                <div className="crumina-module crumina-heading with-title-decoration">
                    <h5 className="heading-title">Comments ({comments.length})</h5>
                </div>
                <ul className="comments-list">
                    {comments && authUser
                        && 
                        comments.map(comment => (
                            <CommentDetail 
                                key={comment.id} 
                                comment={comment} 
                                authUser={authUser} 
                                onDeleteComment={onDeleteComment} 
                                onBindComment={this.onBindComment} 
                                onVoteComment={voteComment}
                                loading={loading}
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