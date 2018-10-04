import React,{PureComponent,Fragment} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Head from '../presentational/Head'
import Footer from '../presentational/Footer'
import PostDetail from '../presentational/PostDetail'


import {Creators as PostCreators,getPostById} from '../../store/features/post'
import CommentContainer from '../container/CommentContainer';



/**
* @description 
* Componente que representa a página Post
*/
class Post extends PureComponent {

    componentDidMount() {
        const { post,getAllData} = this.props;
        if(post === undefined)
            getAllData()
        
    }
    
    render() {
        
        const {post,authUser,deletePost,voteComment} = this.props
        return (
            <div>
                <Head></Head>
                <div className="container negative-margin-top150">
                    <div className="col col-xl-8 m-auto col-lg-12 col-md-12 col-sm-12 col-12">
                    {post
                        && 
                        <Fragment>
                            <PostDetail 
                                post={post} 
                                authUser={authUser} 
                                onDeletePost={deletePost}
                                onVotePost={voteComment}
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
    const {user} = state;
    const {match} = ownProps;
    return {
        post : getPostById(match.params.id)(state),
        authUser : user
    }
}

function mapDispatchToProps (dispatch) {
    return {
        deletePost: (id,event) => {
            event.preventDefault();
            dispatch(PostCreators.delete(id))
        },
        getAllData: ()              =>  {
            dispatch(PostCreators.fetch())
        },
        voteComment: (id,user,option,event) => {
            event.preventDefault();
            dispatch(PostCreators.vote(id,user,option))
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Post))

