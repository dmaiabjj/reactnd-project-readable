import React from "react"
import PropTypes from 'prop-types';


const propTypes = {
    quantity    : PropTypes.number.isRequired
};

/**
* @description 
* Componente de paginação
*
* @constructor
* @param {Number} quantity     Quantidades de itens
*/
function Pagination({quantity}) {
    return (
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link" href="#" tabindex="-1">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">...</a></li>
                <li class="page-item"><a class="page-link" href="#">12</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    )
}

Pagination.propTypes = propTypes;

export default Pagination
