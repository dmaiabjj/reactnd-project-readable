import React from "react"
import PropTypes from 'prop-types';


const propTypes = {
    categories             : PropTypes.array.isRequired,
    searchPostByCategory   : PropTypes.func.isRequired
};

/**
* @description 
* Componente que mostra as categorias cadastradas para filtrar os posts
*
* @constructor
* @param {Array} categories                 Coleção de Categorias
* @param {Function} searchPostByCategory    Função que irá fazer o filtro de uma categoria específica
*/
function CategoryOption({categories,searchPostByCategory}) {
    return (
        <ul class="cat-list-bg-style align-center sorting-menu">
            <li key={all} class="cat-list__item active" data-filter="*">
                <a href="#" class="" onClick={(event) => {searchPostByCategory(event,"all")}}>All Projects</a>
            </li>
           {
                categories.map(category => {
                    return (
                        <li key={category.name} class="cat-list__item active" data-filter="*">
                            <a href="#" class="" onClick={(event) => {searchPostByCategory(event,category.name)}}>{category.name}</a>
                        </li>
                    );
                })
           }
        </ul>
    )
}

CategoryOption.propTypes = propTypes;

export default CategoryOption
