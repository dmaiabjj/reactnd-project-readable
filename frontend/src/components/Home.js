import React,{Fragment, Component} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Head from './presentational/Head'
import Footer from './presentational/Footer'
import AddPostButton from './presentational/AddPostButton'
import Post from './presentational/Post'
import CategoryOption from './presentational/CategoryOption'
import SearchNotFound from './presentational/SearchNotFound'

import {Creators as SharedCreators} from '../store/features/shared'
import {Creators as PostCreators} from '../store/features/post'
import {getPosts} from '../store/features/post'

/**
* @description 
* Componente que representa a página Home
*/
class Home extends Component {
    componentDidMount() {
        this.props.getAllData()
    }

    ShowComponent = () => {
        const {posts,authUser,app,deletePost} = this.props;

        if(app.fetched && posts.length <= 0)
            return <SearchNotFound/>
        else{
            return (
                posts.map(post => (
                    <Post key={post.id} post={post} isOwner={post.author === authUser.name} onDeletePost={deletePost}></Post>
                ))
            )
        }
    }

   render() {
       console.log(this.props)
        return (
            <Fragment>
                <Head></Head>
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="clients-grid">
                                <CategoryOption currentCategory= {this.props.match.params.id} categories={this.props.categories}></CategoryOption>
                            </div>
                        </div>
                        {
                            this.ShowComponent()
                        }
                    </div>
                </div>
                <AddPostButton></AddPostButton>
                <Footer></Footer>
            </Fragment>
        )
    }
}

function mapStateToProps (state,ownProps) {
    const {categories,app,user} = state;
    const getPostsFiltered = getPosts(ownProps.match.params.id)
    return {
        categories,
        posts : getPostsFiltered(state),
        authUser : user,
        app 
    }
}

function mapDispatchToProps (dispatch) {
    return {
       getAllData: ()   =>  dispatch(SharedCreators.handleInitialData()),
       deletePost: (id,event) => {
           event.preventDefault();
           dispatch(PostCreators.delete(id))
       }
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
