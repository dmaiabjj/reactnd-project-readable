import React,{Fragment, Component} from 'react'
import Head from './presentational/Head'
import Footer from './presentational/Footer'
import AddPostButton from './presentational/AddPostButton'
import {connect} from 'react-redux'
/**
* @description 
* Componente que representa a página Post Categorie
*/
class PostCategory extends Component {
    componentDidMount() {
    }

    render() {
        const project     = "Udacity - Leitura";
        const description = "Bem vindos ao Udacity Leitura, onde podemos discutir assuntos variados com uma gama enorme de pessoas";
        return (
            
            <Fragment>
                <Head project={project} description={description}></Head>
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

export default PostCategory
