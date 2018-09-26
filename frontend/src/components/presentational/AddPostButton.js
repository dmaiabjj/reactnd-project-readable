import React from "react"
import {Link} from "react-router-dom"

/**
* @description 
* Componente que representa o botão que redireciona pra página de adicionar Post
*/
function AddPostButton() {
    return (
        <Link to="post/add" className="back-to-top">
            <img src="img/back-to-top.svg" alt="arrow" className="back-icon"></img>
        </Link>
    )
}

export default AddPostButton
