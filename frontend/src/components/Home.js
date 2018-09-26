import React,{Fragment} from "react"
import Head from "./presentational/Head"
import Footer from "./presentational/Footer"
import CategoryOption from "./presentational/CategoryOption";
import FilterBy from "./presentational/FilterBy";
/**
* @description 
* Componente que representa a página Home
*/
function Home() {
    const project       = "Projeto Leitura - Udacity";
    const description   = "Bem vindos ao Udacity Leitura, onde podemos discutir assuntos variados com uma gama enorme de pessoas";
    const categories    = ["react","redux","udacity"]
    const searchPostByCategory = (e,category) => { alert(category)};
    return (
        <Fragment>
            <Head project={project} description={description}></Head>
            <CategoryOption categories={categories} searchPostByCategory={searchPostByCategory}></CategoryOption>
            <FilterBy categoryID={"all"} searchPostByCategory={searchPostByCategory}></FilterBy>
            <Footer project={project}></Footer>
        </Fragment>
    )
}


export default Home
