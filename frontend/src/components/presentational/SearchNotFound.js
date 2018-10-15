import React from 'react'
import {Link} from 'react-router-dom'

/**
* @description 
* Componente de 404 genérico da aplicação
*
* @constructor
*/
function SearchNotFound() {
    return (
        <section className="medium-padding120">
            <div className="container">
                <div className="row">
                    <div className="col col-xl-6 m-auto col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="page-404-content">
                            <img src="/img/404.png" alt="fantasminha" />
                            <div className="crumina-module crumina-heading align-center">
                                <h2 className="h1 heading-title">O <span className="c-primary">Fantasminha</span> deu as caras! Infelizmente, não era o que você estava procurando...</h2>
                                <p className="heading-text">Desculpem! Os posts que você estava procurando foram movidos ou não existem.
                                    Se você desejar, você pode voltar para homepage e iniciar outra busca
                                </p>
                            </div>
                            <Link className="btn btn-primary btn-lg" to={`/post/category/all`}>
                                Homepage
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SearchNotFound
