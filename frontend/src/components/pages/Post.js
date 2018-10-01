import React,{PureComponent} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Head from '../presentational/Head'
import PostDetail from '../presentational/PostDetail'
import Footer from '../presentational/Footer'


import {Creators as PostCreators,getPostById} from '../../store/features/post'

/**
* @description 
* Componente que representa a página Post
*/
class Post extends PureComponent {

    render() {
        const {post,authUser,deletePost} = this.props
        return (
            <div>
                <Head></Head>
                <div className="container negative-margin-top150">
                    <div className="col col-xl-8 m-auto col-lg-12 col-md-12 col-sm-12 col-12">
                        <PostDetail post={post} isOwner={post.author === authUser.name} onDeletePost={deletePost}></PostDetail>
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
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Post))

