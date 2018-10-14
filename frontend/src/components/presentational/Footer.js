import React from 'react'
import PropTypes from 'prop-types';


const propTypes = {
    project : PropTypes.string.isRequired
};

const defaultProps = {
    project: 'Udacity - Leitura'
};

/**
* @description 
* Componente que representa o footer genérico da aplicação
*
* @constructor
* @param {String} project   Nome do projeto
*/
function Footer({project}) {
    return (
        <div className="sub-footer-copyright">
        <span>
            {project}
        </span>
    </div>
    
    )
}


Footer.propTypes    = propTypes;
Footer.defaultProps = defaultProps;

export default Footer
