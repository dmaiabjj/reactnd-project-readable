import React,{Fragment, Component} from 'react'
import Head from './presentational/Head'
import Footer from './presentational/Footer'
import CategoryOption from './presentational/CategoryOption'
import AddPostButton from './presentational/AddPostButton'
import {connect} from 'react-redux'
import {Creators} from '../store/features/category'
/**
* @description 
* Componente que representa a página Home
*/
class Home extends Component {
    componentDidMount() {
        this.props.dispatch(Creators.fetch())
    }

    render() {
        const project     = "Udacity - Leitura";
        const description = "Bem vindos ao Udacity Leitura, onde podemos discutir assuntos variados com uma gama enorme de pessoas";
        const { categories} = this.props
        const searchPostByCategory = (event,category) => {alert(category)}
        return (
            
            <Fragment>
                <Head project={project} description={description}></Head>
                <CategoryOption categories={categories} searchPostByCategory={searchPostByCategory}></CategoryOption>
                <AddPostButton></AddPostButton>
                <Footer project={project}></Footer>
            </Fragment>
        )
    }
}

function mapStateToProps ({ categories}) {
    return {
        categories
    }
  }

export default connect(mapStateToProps)(Home)
