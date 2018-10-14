import React,{PureComponent,Fragment} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Head from '../presentational/Head'
import Footer from '../presentational/Footer'
import PostDetail from '../presentational/PostDetail'
import LoadingLinear from '../presentational/LoadingLinear'

import CommentContainer from '../container/CommentContainer';

import {Creators as PostCreators,getPostById} from '../../store/features/post'




/**
* @description 
* Componente que representa a página Post
*/
class Post extends PureComponent {

    componentDidMount() {
        const {match:{params:{id}},fetchPost,post} = this.props;
        if(post === undefined)
            fetchPost(id)
        
    }
    
    render() {
        
        const {app,post,authUser,deletePost,votePost,reactPost} = this.props
        return (
            <div>
                <Head img={'/img/blog_bottom.png'}></Head>
                {app.loading && <LoadingLinear col></LoadingLinear>}
                <div className={`container negative-margin-top50${app.loading ? ' disabled-content' : ''}`}>
                    <div className="col col-xl-8 m-auto col-lg-12 col-md-12 col-sm-12 col-12">
                    {post
                        && 
                        <Fragment>
                            <PostDetail 
                                post={post} 
                                authUser={authUser} 
                                onDeletePost={deletePost}
                                onVotePost={votePost}
                                onReactPost={reactPost}
                            />
                            <CommentContainer 
                                postId={post.id} 
                                user={authUser}
                            />
                        </Fragment>
                    }
                    
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}


function mapStateToProps (state,ownProps) {
    const {user,app} = state;
    const {match:{params:{id}}} = ownProps;
    return {
        post : getPostById(id)(state),
        authUser : user,
        app
    }
}

function mapDispatchToProps (dispatch,ownProps) {
    const {history} = ownProps
    return {
        deletePost: (id,event) => {
            event.preventDefault();
            dispatch(PostCreators.delete(id,history))
        },
        fetchPost: (id) => {
            dispatch(PostCreators.fetchById(id))
        },
        votePost: (id,user,option,event) => {
            event.preventDefault();
            dispatch(PostCreators.vote(id,user,option))
        },
        reactPost: (id,user,option,event) => {
            event.preventDefault();
            dispatch(PostCreators.react(id,user,option))
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Post))

