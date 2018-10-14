import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {formatDate} from '../../utilities/helpers'
import _ from 'lodash'

import LoadingCircular from '../presentational/LoadingCircular'

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
class Post extends Component  {
    state = {
        showLoading: false,
    };
    
    componentWillUnmount() {
        this.setState({showLoading : false});
    }

    onDelete = (id,event) => {
        this.setState({showLoading : true})
        const {onDeletePost} = this.props
        onDeletePost(id,event)
    }


    render(){
        const {post,isOwner}    = this.props
        const {showLoading}     = this.state

        return (
            <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12  sorting-item family animals natural politics">
                <div className="ui-block">
                    <article className="hentry post">
                        {showLoading && <LoadingCircular></LoadingCircular>}
                        {
                            !showLoading &&
                            <Fragment>
                            {!showLoading && isOwner && <div className="more">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                                    </svg>
                                    <ul className="more-dropdown">
                                        <li>
                                            <Link to={`/post/edit/${post.id}`}>Editar Post</Link>
                                        </li>
                                        <li>
                                            <a href="" onClick={(event) => this.onDelete(post.id,event)}>Apagar Post</a>
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
                                    <Link to={`/post/detail/${post.id}`}>
                                            {post.title}
                                    </Link>
                                </h4>
                                <p className="description">
                                { _.truncate(post.body, {
                                        'length': 300
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
                                            
                                        {
                                            _.chain(post.reactions).groupBy("option").map(function(v, i) {
                                                return {
                                                  option: i,
                                                  users: _.map(v, 'name')
                                                }
                                              }).value().map((r) => {
                                                return <li key={r.option}>
                                                        <img src={`/img/icon-${r.option}.png`} alt={r.option}/>
                                                    </li>
                                              })
                                            
                                        }
                                    </ul>
                                    <div className="names-people-likes">
                                        {post.reactions.reduce((acc,vote) => {
                                                    return acc + 1
                                                },0)
                                        }
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
                            </Fragment>
                        }
                        
                    </article>
                </div>
            </div>
        )
    }
}

Post.propTypes    = propTypes;

export default Post