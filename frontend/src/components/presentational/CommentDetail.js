import React ,{Component, Fragment} from 'react'
import PropTypes from 'prop-types';
import {formatDate} from '../../utilities/helpers'
import LoadingCircular from '../presentational/LoadingCircular'

const propTypes = {
    comment : PropTypes.shape({
        id: PropTypes.string.isRequired,
        parentId : PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        votes: PropTypes.arrayOf(PropTypes.shape({
            user : PropTypes.string,
            option : PropTypes.string,
            value : PropTypes.number
        })).isRequired,
      }).isRequired,
      authUser : PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar : PropTypes.string.isRequired
      }).isRequired,
      onDeleteComment   : PropTypes.func.isRequired,
      onBindComment     : PropTypes.func.isRequired,
      onVoteComment     : PropTypes.func.isRequired,
      loading           : PropTypes.bool.isRequired
};


/**
* @description 
* Componente que representa um resumo do post dentro da lista de posts carregados
* @param {Object} comment              Comment
* @param {Object} authUser             Usuário Logado
* @param {Function} onDeleteComment    Método responsável por deletar o comment
* @param {Function} onBindComment      Método responsável por criar um comentário para adição ou atualização
* @param {Function} onVoteComment      Método responsável pelo votescore do comentário
* @param {Boolean} loading             Se é necessário mostrar o loading

*/
class CommentDetail extends Component  {

    state = {
        showLoading: false,
    };
    
    componentWillUnmount() {
        this.setState({showLoading : false});
    }

    onDelete = (id,event) => {
        this.setState({showLoading : true})
        const {onDeleteComment} = this.props
        onDeleteComment(id,event)
    }

    setClassName = (option) =>{
        const {comment,authUser}    = this.props
        const vote                  = comment.votes.find((v) => v.user === authUser.name && v.option === option)
        return (vote) ? "active" : ""
    }

    render() {
        const {comment,authUser,onBindComment,onVoteComment} = this.props
        const {showLoading}     = this.state
        return (
            <li className="comment-item">
                {showLoading && <LoadingCircular></LoadingCircular>}
                {!showLoading &&
                    <Fragment>
                        <div className="post__author author vcard inline-items">
                            <div className="author-date">
                                <a className="h6 post__author-name fn" href="02-ProfilePage.html">{comment.author}</a>
                                <div className="post__date">
                                    <time className="published" dateTime={formatDate(comment.timestamp)}>
                                        {formatDate(comment.timestamp)}
                                    </time>
                                </div>
                            </div>
                            {comment.author === authUser.name && 
                                <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                                    </svg>
                                    <ul className="more-dropdown">
                                        <li>
                                            <a href="" onClick={(event) => onBindComment(comment,event)}>Edit Post</a>
                                        </li>
                                        <li>
                                            <a href="" onClick={(event) => this.onDelete(comment.id,event)}>Delete Post</a>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <p>{comment.body}</p>
                            <a href="" onClick={(event) => onVoteComment(comment.id,authUser.name,"upVote",event)} className={`post-add-icon inline-items ${this.setClassName("downVote")}`}>
                                <svg className="olymp-heart-icon">
                                    <title>Up</title>
                                    <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-heart-icon"></use>
                                </svg>
                            </a>
                            <a href="" onClick={(event) => onVoteComment(comment.id,authUser.name,"downVote",event) } className={`post-add-icon inline-items ${this.setClassName("downVote")}`}>
                                <svg id="olymp-heart-icon" viewBox="0 0 36 32" width="100%" height="100%">
                                    <title>Down</title>
                                    <g transform="translate(35,30) rotate(180)">
                                        <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-heart-icon"></use>
                                    </g>
                                </svg>
                            </a>
                            <span>
                                {comment.votes.reduce((acc,vote) => {
                                        return acc + vote.value
                                    },0)
                                }
                            </span>
                    </Fragment>
                    
                }
           </li>
        )
    }
}

CommentDetail.propTypes    = propTypes;

export default CommentDetail
