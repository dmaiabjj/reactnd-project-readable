import React from "react"
import PropTypes from 'prop-types';


const propTypes = {
    description         : PropTypes.string.isRequired
};

/**
* @description 
* Componente o footer genérico da aplicação
*
* @constructor
* @param {String} description   Breve descrição para o footer
*/
function Footer({description}) {
    return (
        <div class="sub-footer-copyright">
        <span>
            {description}
        </span>
    </div>
    )
}

Footer.propTypes = propTypes;

export default Footer
