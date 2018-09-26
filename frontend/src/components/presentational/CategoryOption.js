import React from "react"
import PropTypes from 'prop-types';
import {Link} from "react-router-dom"

const propTypes = {
    categories              : PropTypes.array.isRequired,
    currentCategory         : PropTypes.string
};

/**
* @description 
* Componente que mostra as categorias cadastradas para filtrar os posts
*
* @constructor
* @param {Array} categories              Coleção de Categorias
* @param {Array} currentCategory         Categoria atual
*/
function CategoryOption({currentCategory = "all", categories}) {
    return (
        <ul className="cat-list-bg-style align-center sorting-menu">
            <li key={"all"} className={`cat-list__item ${currentCategory === "all" ? 'active' : ''}`} data-filter="*">
                <Link to="/">Todos</Link>
            </li>
           {
                categories.map(category => {
                    return (
                        <li key={category.name} className={`cat-list__item ${currentCategory === category.name ? 'active' : ''}`} data-filter="*">
                            <Link to={`/post/category/${category.name}`}>{category.name}</Link>
                        </li>
                    );
                })
           }
        </ul>
    )
}

CategoryOption.propTypes = propTypes;

export default CategoryOption
