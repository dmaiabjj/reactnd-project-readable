import React,{Fragment, PureComponent} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Head from '../presentational/Head'
import Footer from '../presentational/Footer'
import AddPostButton from '../presentational/AddPostButton'
import CategoryOption from '../presentational/CategoryOption'
import LoadingLinear from '../presentational/LoadingLinear'
import FilterBy from '../presentational/FilterBy'
import PostList from '../container/PostList'


import {Creators as SharedCreators} from '../../store/features/shared'

/**
* @description 
* Componente que representa a página Home
*/
class Home extends PureComponent {

    filters = {
        "votes" :  function (obj) {
            return obj.votes.reduce((acc,vote) => {
                return acc + vote.value
            },0)
          },
        "timestamp" : "timestamp" 
    }

    state = {
        filter: "votes",
        order:  "desc"
    }

    /**
    * @description Seta os filtros a serem passados pro Component PostList pra ser usado na busca dos posts
    * @param   {String} filter    Campo a ser usado como filtro dos posts
    * @param   {String} order     Ordenação da busca
    */
    handleFilter = (filter,order) => {
        console.log(filter)
        console.log(order)
        this.setState({filter,order})
    }

    componentDidMount() {
        this.props.getAllData()
    }

    render() {
        const {app} = this.props;
        return (
            <Fragment>
                <Head img={'/img/blog_bottom.png'}></Head>
                {app.loading && <LoadingLinear col></LoadingLinear>}
                <div className="container">
                    <div className="row">
                        <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="clients-grid">
                            <Fragment>
                                <CategoryOption 
                                    currentCategory= {this.props.match.params.id} 
                                    categories={this.props.categories}
                                />
                                <FilterBy 
                                    search={this.handleFilter} 
                                />
                            </Fragment>
                            </div>
                        </div>
                        <PostList 
                                category={this.props.match.params.id} 
                                filter={this.filters[this.state.filter]} 
                                order={this.state.order} />
                    </div>
                </div>
                <AddPostButton></AddPostButton>
                <Footer></Footer>
            </Fragment>
        )
    }
}

function mapStateToProps (state) {
    const {categories,app} = state;
    return {
        categories,
        app
    }
}

function mapDispatchToProps (dispatch) {
    return {
       getAllData: ()   =>  dispatch(SharedCreators.handleInitialData())
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home))
