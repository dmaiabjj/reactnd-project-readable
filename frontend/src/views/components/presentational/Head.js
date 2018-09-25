import React from "react"
import PropTypes from 'prop-types';


const propTypes = {
    title               : PropTypes.string.isRequired,
    description         : PropTypes.string.isRequired
};

/**
* @description 
* Componente o header genérico da aplicação
*
* @constructor
* @param {String} title         Título do Header
* @param {String} description   Breve descrição da página
*/
function Head({title,description}) {
    return (
        <div class="main-header">
            <div class="content-bg-wrap bg-group"></div>
            <div class="container">
                <div class="row">
                    <div class="col col-lg-8 m-auto col-md-8 col-sm-12 col-12">
                        <div class="main-header-content">
                            <h1>{title}</h1>
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
            <img class="img-bottom" src="img/blog_bottom.png" alt="Blog"/>
        </div>
    )
}

Head.propTypes = propTypes;

export default Head
