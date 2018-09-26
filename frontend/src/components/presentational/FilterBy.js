import React from "react"
import PropTypes from 'prop-types';

const propTypes = {
    categoryID             : PropTypes.string.isRequired,
    searchPostByCategory   : PropTypes.func.isRequired
};

/**
* @description 
* Componente que irá mostrar as opções de ordenação das categorias
*
* @constructor
* @param {String} categoryID                Identificador da Categoria
* @param {Function} searchPostByCategory    Função que irá fazer o filtro de uma categoria específica
*/
function FilterBy({categoryID,searchPostByCategory}) {
    return (
        <div className="ui-block responsive-flex1200">
            <div className="ui-block-title">
                <div className="w-select">
                    <div className="title">Filtrar por:</div>
                    <div className="w-select">
                        <fieldset className="form-group">
                            <select className="selectpicker form-control" onChange={(event) => {searchPostByCategory(event,categoryID)}}>
                                <option value="DD">Data &#8595;</option>
                                <option value="DA">Date &#x02191;</option>
                                <option value="VD">Vote &#8595;</option>
                                <option value="VA">Vote &#x02191;</option>
                            </select>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

FilterBy.propTypes = propTypes;

export default FilterBy
