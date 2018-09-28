import React from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {formatDate} from '../../utilities/helpers'

const propTypes = {
    post : PropTypes.object.isRequired
};

const defaultProps  = {
    post : {
        id: '8xf0y6ziyjabvozdd253nd',
        timestamp: 1467166872634,
        title: 'Udacity is the best place to learn React',
        body: 'Everyone says so after all.',
        author: 'thingtwo',
        category: 'react',
        voteScore: 6,
        deleted: false,
        commentCount: 10
    }
};

/**
* @description 
* Componente que representa um resumo do post dentro da lista de posts carregados
*/
function Post({post}) {
    return (
        <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12  sorting-item family animals natural politics">
            <div className="ui-block">
                <article className="hentry post">
                    <Link className="post-category bg-primary" to={`/post/category/${post.category}`}>
                        {post.category}
                    </Link>
                    <div className="post__author author vcard ">
                        <div className="author-date">
                            <span className="h6 post__author-name fn">{post.author}</span>
                            <div className="post__date">
                                <time className="published" dateTime="2004-07-24T18:18">
                                    {formatDate(post.timestamp)}
                                </time>
                            </div>
                        </div>
                        <div className="more">
                            <svg className="olymp-three-dots-icon">
                                <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                            </svg>
                            <ul className="more-dropdown">
                                <li>
                                    <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                                </li>
                                <li>
                                    <a href="">Delete Post</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h4>
                        <Link to={`/post/${post.id}`}>
                                {post.title}
                        </Link>
                    </h4>
                    <p>
                       {post.body}
                    </p>
                    <div className="post-additional-info inline-items">
                        <div className="post-add-icon inline-items">
                            <svg id="olymp-heart-icon">
                                <title>Votes</title>
                                <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-heart-icon"></use>
                            </svg>
                            <span>{post.voteScore}</span>
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
                    <div className="control-block-button post-control-button">
                        <a href="" className="btn btn-control">
                            <svg className="olymp-like-post-icon" role="img">
                                <title>Vote Up</title>
                                <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-like-post-icon"></use>
                            </svg>
                        </a>
                        <Link className="btn btn-control" to={`/post/${post.id}`}>
                            <svg className="olymp-comments-post-icon">
                                <title>Comentar</title>
                                <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-comments-post-icon"></use>
                            </svg>   
                        </Link>
                    </div>
                </article>
            </div>
        </div>
                          
    )
}

Post.propTypes    = propTypes;
Post.defaultProps = defaultProps;

export default Post
