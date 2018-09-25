import React from "react"
import {Link} from "react-router-dom"

/**
* @description 
* Componente que representa o botão que redireciona pra página de adicionar Post
*/
function AddPostButton() {
    return (
        <Link to="/add" class="back-to-top">
            <img src="img/back-to-top.svg" alt="arrow" class="back-icon"></img>
        </Link>
    )
}

export default AddPostButton
