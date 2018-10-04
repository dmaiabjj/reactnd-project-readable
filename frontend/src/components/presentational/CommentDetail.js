import React from 'react'
import PropTypes from 'prop-types';
import {formatDate} from '../../utilities/helpers'

const propTypes = {
    comment : PropTypes.shape({
        id: PropTypes.string.isRequired,
        parentId : PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        votes: PropTypes.array.isRequired
      }).isRequired,
      isOwner : PropTypes.bool.isRequired,
      onDeleteComment   : PropTypes.func.isRequired,
      onBindComment     : PropTypes.func.isRequired,
      onVoteComment     : PropTypes.func.isRequired
};


/**
* @description 
* Componente que representa um resumo do post dentro da lista de posts carregados
* @param {Object} comment              Comment
* @param {Boolean} isOwner             Informa se o usuário logado é o dono do comment
* @param {Function} onDeleteComment    Método responsável por deletar o comment
* @param {Function} onBindComment      Método responsável por criar um comentário para adição ou atualização
* @param {Function} onVoteComment      Método responsável pelo votescore do comentário

*/
function CommentDetail({comment,isOwner,onDeleteComment,onBindComment,onVoteComment})  {
    return (
        <li className="comment-item">
            <div className="post__author author vcard inline-items">
                <div className="author-date">
                    <a className="h6 post__author-name fn" href="02-ProfilePage.html">{comment.author}</a>
                    <div className="post__date">
                        <time className="published" dateTime={formatDate(comment.timestamp)}>
                            {formatDate(comment.timestamp)}
                        </time>
                    </div>
                </div>
                {isOwner && 
                    <div className="more">
                        <svg className="olymp-three-dots-icon">
                            <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                        </svg>
                        <ul className="more-dropdown">
                            <li>
                                <a href="" onClick={(event) => onBindComment(comment,event)}>Edit Post</a>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onDeleteComment(comment.id,event)}>Delete Post</a>
                            </li>
                        </ul>
                    </div>
                }
            </div>
            <p>{comment.body}</p>
                <a href="" onClick={(event) => onVoteComment(comment.id,comment.author,"upVote",event)} className="post-add-icon inline-items">
                    <svg className="olymp-heart-icon">
                        <title>Up</title>
                        <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-heart-icon"></use>
                    </svg>
                </a>
                <a href="" className="post-add-icon inline-items" onClick={(event) => onVoteComment(comment.id,comment.author,"downVote",event)}>
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
        </li>
                          
    )
}

CommentDetail.propTypes    = propTypes;

export default CommentDetail
