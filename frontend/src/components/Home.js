import React,{Fragment, PureComponent} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Head from './presentational/Head'
import Footer from './presentational/Footer'
import AddPostButton from './presentational/AddPostButton'
import CategoryOption from './presentational/CategoryOption'
import FilterBy from './presentational/FilterBy'
import PostList from './presentational/PostList'

import {Creators as SharedCreators} from '../store/features/shared'

/**
* @description 
* Componente que representa a página Home
*/
class Home extends PureComponent {

    state = {
        filter: "timestamp",
        order:  "asc"
    }

    handleFilter = (filter,order) => {
        console.log(order)
        this.setState({filter,order})
    }

    componentDidMount() {
        this.props.getAllData()
    }

    render() {
        console.log("Home: ",this.props)
        return (
            <Fragment>
                <Head></Head>
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="clients-grid">
                                <CategoryOption currentCategory= {this.props.match.params.id} categories={this.props.categories}></CategoryOption>
                                <FilterBy search={this.handleFilter}></FilterBy>
                            </div>
                        </div>
                        <PostList category={this.props.match.params.id} filter={this.state.filter} order={this.state.order}></PostList>
                    </div>
                </div>
                <AddPostButton></AddPostButton>
                <Footer></Footer>
            </Fragment>
        )
    }
}

function mapStateToProps (state) {
    const {categories} = state;
    return {
        categories
    }
}

function mapDispatchToProps (dispatch) {
    return {
       getAllData: ()   =>  dispatch(SharedCreators.handleInitialData())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
