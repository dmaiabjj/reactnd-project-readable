import React from 'react'
import Head from '../presentational/Head'
import AddPostContainer from '../container/AddPostContainer'
import Footer from '../presentational/Footer'
/**
* @description 
* Componente que representa a página Home
*/
function AddPost() {
    const img           = '/img/group-bottom.png';
    const description   = 'Aqui, você poderá criar e gerenciar facilmente tópicos para compartilhar com o comunidade! Incluímos alguns dos tópicos mais usados, para que você possa se divertir com eles!';
    return (
        <div>
            <Head 
                img={img}
                description={description}
            />
          <AddPostContainer/>
          <Footer/>
        </div>
    )
}


export default AddPost
