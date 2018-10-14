import React,{Component} from 'react'
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
      authUser : PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar : PropTypes.string.isRequired
      }).isRequired,
      onVotePost : PropTypes.func.isRequired,
      onReactPost : PropTypes.func.isRequired,
      onDeletePost : PropTypes.func.isRequired
};


/**
* @description 
* Componente que representa um resumo do post dentro da lista de posts carregados
* @param {Object} post              Post
* @param {Object} authUser          Usuário logado
* @param {Function} onVotePost      Método responsável por votar o post
* @param {Function} onReactPost     Método responsável por adicionar uma reação o post
* @param {Function} onDeletePost    Método responsável por deletar o post
*/
class PostDetail extends Component {

    setClassName = (option) =>{
        const {post,authUser}       = this.props
        const vote                  = post.votes.find((p) => p.user === authUser.name && p.option === option)
        return (vote) ? "active" : ""
    }

    render() {
        const {post,authUser,onVotePost,onDeletePost,onReactPost} = this.props
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
                                    <a href="" onClick={(event) => onVotePost(post.id,authUser.name,"downVote",event) } className={`post-add-icon inline-items ${this.setClassName("downVote")}`}>
                                        <svg id="olymp-heart-icon" viewBox="0 0 36 32" width="100%" height="100%">
                                            <title>Down</title>
                                            <g transform="translate(35,30) rotate(180)">
                                                <use xlinkHref="/img/svg-icons/sprites/icons.svg#olymp-heart-icon"></use>
                                            </g>
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
                            {
                                _.chain(post.reactions).groupBy("option").map(function(v, i) {
                                    return {
                                      option: i,
                                      users: _.map(v, 'name')
                                    }
                                  }).value().map((r) => {
                                    return <li key={r.option}>
                                        <div className="post-add-icon inline-items">
                                            <img src={`/img/icon-${r.option}.png`} alt={r.option} />
                                            <span>{r.users.length}</span>
                                        </div>
                                    </li>
                                  })
                            }
                        </ul>
                        <div className="post-content">
                            <p>
                                {post.body.trim()}
                            </p>
                        </div>
                    </div>
                    <div className="choose-reaction reaction-colored">
                        <div className="title">Choose your <span>Reaction!</span></div>
                        <ul>
                            <li>
                                <a href="" onClick={(event) => onReactPost(post.id,authUser.name,"feliz",event)} >
                                    <img src="/img/icon-feliz.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Feliz" />
                                </a>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onReactPost(post.id,authUser.name,"zumbi",event)} >
                                    <img src="/img/icon-zumbi.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Zumbi" />
                                </a>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onReactPost(post.id,authUser.name,"bravo",event)} >
                                    <img src="/img/icon-bravo.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Bravo" />
                                </a>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onReactPost(post.id,authUser.name,"careta",event)} >
                                    <img src="/img/icon-careta.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Careta"/>
                                </a>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onReactPost(post.id,authUser.name,"doente",event)} >
                                    <img src="/img/icon-doente.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Doente"/>
                                </a>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onReactPost(post.id,authUser.name,"amei",event)} >
                                    <img src="/img/icon-amei.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Amei"/>
                                </a>
                            </li>
                            <li>
                                <a href="" onClick={(event) => onReactPost(post.id,authUser.name,"gostei",event)} >
                                    <img src="/img/icon-gostei.png" alt="icon" data-toggle="tooltip" data-placement="top" data-original-title="Gostei"/>
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
