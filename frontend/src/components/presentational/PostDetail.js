import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import {formatDate} from '../../utilities/helpers'

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
      authUser : PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar : PropTypes.string.isRequired
      }).isRequired,
      onVotePost : PropTypes.func.isRequired,
      onDeletePost : PropTypes.func.isRequired
};


/**
* @description 
* Componente que representa um resumo do post dentro da lista de posts carregados
* @param {Object} post              Post
* @param {Boolean} isOwner          Informa se o usuário logado é o dono do post
* @param {Function} onDeletePost    Método responsável por deletar o post
*/
class PostDetail extends Component {

    setClassName = (option) =>{
        const {post,authUser}       = this.props
        const vote                  = post.votes.find((p) => p.user === authUser.name && p.option === option)
        return (vote) ? "active" : ""
    }

    render() {
        const {post,authUser,onVotePost,onDeletePost} = this.props
        console.log(post)
        return (
            <div className="ui-block">
                <article className="hentry blog-post single-post single-post-v1">
                    <div className="control-block-button post-control-button">
                        {post.author === authUser.name &&  
                            <div className="more">
                                <a href="" className="btn btn-control">
                                    <svg className="olymp-three-dots-icon">
                                        <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-three-dots-icon"></use>
                                    </svg>
                                </a>
                                <ul className="more-dropdown">
                                    <li>
                                    <Link to={`/post/edit/${post.id}`}>
                                        Editar Post
                                    </Link>
                                    </li>
                                    <li>
                                        <a href="" onClick={(event) => onDeletePost(post.id,event)}>Apagar Post</a>
                                    </li>
                                </ul>
                            </div>
                        }
                    </div>
                    <Link className="post-category bg-primary" to={`/post/category/${post.category}`}>
                        {post.category}
                    </Link>
                    <h1 className="post-title">{post.title}</h1>
                    <div className="author-date">
                        by
                        <span className="h6 post__author-name fn"> { post.author } </span>
                        <div className="post__date">
                            <time className="published" dateTime={formatDate(post.timestamp)}>
                                {formatDate(post.timestamp)}
                            </time>
                        </div>
                    </div>
                    <div className="post-content-wrap">
                        <ul className="filter-icons">
                            <li>
                                <div className="post-add-icon inline-items">
                                    <a href="" onClick={(event) => onVotePost(post.id,authUser.name,"upVote",event)} className={`post-add-icon inline-items ${this.setClassName("upVote")}`}>
                                        <svg className="olymp-heart-icon">
                                            <title>Up</title>
                                            <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-heart-icon"></use>
                                        </svg>
                                    </a>
                                    <span>
                                        {post.votes.reduce((acc,vote) => {
                                                return acc + vote.value
                                            },0)
                                        }
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className="post-add-icon inline-items">
                                    <svg className="olymp-speech-balloon-icon">
                                        <title>Comentários</title>
                                        <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-speech-balloon-icon"></use></svg>
                                    <span>{post.commentCount}</span>
                                </div>
                            </li>
                            <li>
                                <div className="post-add-icon inline-items">
                                    <img src="/img/icon-chat1.png" alt="icon" />>
                                    <span>58</span>
                                </div>
                            </li>
                            <li>
                                <div className="post-add-icon inline-items">
                                    <img src="/img/icon-chat26.png" alt="icon" />
                                    <span>21</span>
                                </div>
                            </li>
                            <li>
                                <div className="post-add-icon inline-items">
                                    <img src="/img/icon-chat15.png" alt="icon" />
                                    <span>3</span>
                                </div>
                            </li>
                        </ul>
                        <div className="post-content">
                            <p>
                                {post.body}
                            </p>
                        </div>
                    </div>
                    <div className="choose-reaction reaction-colored">
                        <div className="title">Choose your <span>Reaction!</span></div>
                        <ul>
                            <li>
                                <a href="">
                                    <img src="/img/icon-chat13.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="LOL" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/img/icon-chat15.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Amazed" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/img/icon-chat9.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="ANGER" />
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/img/icon-chat4.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="joy"/>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/img/icon-chat6.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="BAD"/>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/img/icon-chat26.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="LIKE"/>
                                </a>
                            </li>
                            <li>
                                <a href="">
                                    <img src="/img/icon-chat27.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="COOL"/>
                                </a>
                            </li>
                        </ul>
                
                    </div>
                </article>
            </div>
        )
    }
}

PostDetail.propTypes    = propTypes;

export default PostDetail
