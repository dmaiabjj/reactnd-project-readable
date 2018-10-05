import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {formatDate} from '../../utilities/helpers'
import _ from 'lodash'

const propTypes = {
    post : PropTypes.shape({
        id: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
        votes: PropTypes.arrayOf(PropTypes.shape({
            user : PropTypes.string,
            option : PropTypes.string,
            value : PropTypes.number
        })).isRequired,
        commentCount : PropTypes.number.isRequired
      }).isRequired,
      isOwner : PropTypes.bool.isRequired,
      onDeletePost : PropTypes.func.isRequired
};


/**
* @description 
* Componente que representa um resumo do post dentro da lista de posts carregados
* @param {Object} post              Post
* @param {Boolean} isOwner          Informa se o usuário logado é o dono do post
* @param {Function} onDeletePost    Método responsável por deletar o post
*/
function Post({post,isOwner, onDeletePost})  {
    return (
        <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12  sorting-item family animals natural politics">
            <div className="ui-block">
                <article className="hentry post">
                    {isOwner && <div className="more">
                        <svg className="olymp-three-dots-icon">
                            <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                        </svg>
                        <ul className="more-dropdown">
                            <li>
                                <Link to={`/post/edit/${post.id}`}>Editar Post</Link>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onDeletePost(post.id,event)}>Apagar Post</a>
                            </li>
                        </ul>
                    </div>
                    }
                    <Link className="post-category bg-primary" to={`/post/category/${post.category}`}>
                        {post.category}
                    </Link>
                    <div className="post__author author vcard inline-items">
                        <div className="author-date">
                            <span className="h6 post__author-name fn"> {post.author} </span>
                            <div className="post__date">
                                <time className="published" dateTime={formatDate(post.timestamp)}>
                                    {formatDate(post.timestamp)}
                                </time>
                            </div>
                        </div>
                    </div>
                    <h4>
                        <Link to={`/post/${post.id}`}>
                                {post.title}
                        </Link>
                    </h4>
                    <p>
                       { _.truncate(post.body, {
                            'length': 500
                          })
                       }
                    </p>
                    <div className="post-additional-info inline-items">
                        <div className="post-add-icon inline-items">
                            <svg id="olymp-heart-icon">
                                <title>Votes</title>
                                <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-heart-icon"></use>
                            </svg>
                            <span>
                                {post.votes.reduce((acc,vote) => {
                                        return acc + vote.value
                                    },0)
                                }
                            </span>
                        </div>
                        <ul className="friends-harmonic off">
                            <li>
                                <img src="/img/icon-chat4.png" alt="icon"/>
                            </li>
                            <li>
                                <img src="/img/icon-chat26.png" alt="icon"/>
                            </li>
                            <li>
                                <img src="/img/icon-chat16.png" alt="icon"/>
                            </li>
                        </ul>
                        <div className="names-people-likes">
                            0
                        </div>
                        <div className="comments-shared">
                            <div className="post-add-icon inline-items">
                                <svg className="olymp-speech-balloon-icon">
                                    <title>Comentários</title>
                                    <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use>
                                </svg>
                                <span>{post.commentCount}</span>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </div>
                          
    )
}

Post.propTypes    = propTypes;

export default Post