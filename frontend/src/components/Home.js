import React,{Fragment, Component} from 'react'
import Head from './presentational/Head'
import Footer from './presentational/Footer'
import CategoryOptionContainer from './containers/CategoryOptionContainer'
import AddPostButton from './presentational/AddPostButton'
/**
* @description 
* Componente que representa a página Home
*/
class Home extends Component {
    componentDidMount() {
    
    }

    render() {
        const project     = "Udacity - Leitura";
        const description = "Bem vindos ao Udacity Leitura, onde podemos discutir assuntos variados com uma gama enorme de pessoas";
        return (
            
            <Fragment>
                <Head project={project} description={description}></Head>
                <CategoryOptionContainer></CategoryOptionContainer>
                <AddPostButton></AddPostButton>
                <Footer project={project}></Footer>
            </Fragment>
        )
    }
}


export default Home
