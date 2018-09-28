import PropTypes from 'prop-types';


const propTypes = {
    test        : PropTypes.bool.isRequired,
    children    : PropTypes.any.isRequired,
    component   : PropTypes.any.isRequired,
};

/**
* @description 
* Componente que representacional da condicional IF.
* Se o test for true, retorna o componente passado, caso contrário retorna o children
* @constructor
*
* @constructor
* @param {boolean} test         Resultado do test
* @param {Any} children         Children do componente 
* @param {Any} component        Componente 
*/

function If({ test, children, component }){
    return (test ? children : component);
}

If.propTypes = propTypes;

export default If;