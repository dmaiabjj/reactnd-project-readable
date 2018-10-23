import React,{PureComponent,Fragment} from 'react'
import {withRouter } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import CommentList from '../container/CommentList';
import CommentForm from '../presentational/CommentForm';

import {Creators as CommentCreators} from '../../store/features/comment'


const propTypes = {
    postId              : PropTypes.string.isRequired,
    user                : PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar : PropTypes.string.isRequired
      }).isRequired,
}

const defaultProps  = {
    postId: "",
    user: {name: '',avatar: ''}
}



/**
*@description
*Componente que representa a Sessão referente a comentários
* @param {String} postId                    Id do Post referente aos comentários
* @param {Object} user                      Usuário logado
*/
export class CommentContainer extends PureComponent {

    state = {
        comment: undefined
    }

    /**
    * @description Seta o comment a ser atualizado e enviado ao form.
    * @param   {Object} comment  Comentário
    */
    onHandleSetComment = (comment) => {
        this.setState({comment});
    }


    /**
    * @description
    * Faz o bind do objeto comentário para realizar a inserção ou atualização
    * @param {Event} comment  Comentário
    */
   onHandleComment = (comment) =>{
        const {addComment,updateComment} = this.props ;
        if(comment.is_new)
            addComment(comment);
        else
            updateComment(comment);

            this.setState({comment : {body: ""}});

    }

     /**
    * @description
    * Responsável por deletar o comentário
    * @param {Event} comment  Comentário
    */
    onHandleDeleteComment = (id,event) =>{
        event.preventDefault();
        const {deleteComment} = this.props ;
        deleteComment(id);

        this.setState({comment : undefined});

    }

    render() {

        const {comment} = this.state;
				const {postId,user,app} = this.props;
        return (
                <Fragment>
                    {postId
                        &&
                        <Fragment>
                            <CommentList
                                postId={postId}
                                onHandleSetComment={this.onHandleSetComment}
                                loading={app.loading}
                                onDeleteComment={this.onHandleDeleteComment}
                            />
                            <CommentForm
                                postId={postId}
                                comment={comment}
                                user={user}
                                loading={app.loading}
                                onHandleComment={this.onHandleComment}
                            />
                        </Fragment>
                    }
                </Fragment>
        )
    }
}

function mapStateToProps (state) {
    const {app} = state;
    return {
        app
    }
}


function mapDispatchToProps (dispatch) {
    return {
        addComment: (comment) => {
            dispatch(CommentCreators.add(comment))
        },
        updateComment: (comment) => {
            dispatch(CommentCreators.update(comment))
        },
        deleteComment: (id) => {
            dispatch(CommentCreators.delete(id))
        }
    }
}


CommentContainer.propTypes    = propTypes;
CommentContainer.defaultProps = defaultProps;

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CommentContainer))

