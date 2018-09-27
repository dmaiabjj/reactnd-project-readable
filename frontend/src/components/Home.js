import React,{Fragment, Component} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Head from './presentational/Head'
import Footer from './presentational/Footer'
import AddPostButton from './presentational/AddPostButton'
import Post from './presentational/Post'
import CategoryOption from './presentational/CategoryOption'

import {Creators} from '../store/features/shared'
import {getPosts} from '../store/features/post'

/**
* @description 
* Componente que representa a página Home
*/
class Home extends Component {
    componentDidMount() {
        this.props.getAllData()
    }

   render() {
        console.log(this.props.posts)
        return (
            <Fragment>
                <Head></Head>
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="clients-grid">
                                <CategoryOption currentCategory= {this.props.match.params.id} categories={this.props.categories}></CategoryOption>
                                <div className="row sorting-container" id="clients-grid-1" data-layout="masonry">
                                {this.props.posts.map(post => (
                                    <Post post={post}></Post>
                                ))} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AddPostButton></AddPostButton>
                <Footer></Footer>
            </Fragment>
        )
    }
}

function mapStateToProps (state) {
    console.log(state)
    return {
        categories : state.categories,
        posts : getPosts(state)
    }
}

function mapDispatchToProps (dispatch) {
    return {
       getAllData: () =>  dispatch(Creators.handleInitialData())
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
