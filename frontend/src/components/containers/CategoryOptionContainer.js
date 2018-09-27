import React,{PureComponent } from "react"
import { connect } from 'react-redux'
import {withRouter } from 'react-router-dom'
import {Creators} from '../../store/features/category'
import CategoryOption from '../presentational/CategoryOption'

/**
* @description 
* Container que mostra as categorias cadastradas para filtrar os posts e está conectado ao redux
*
* @constructor
*/
class CategoryOptionContainer extends PureComponent {

    componentDidMount() {
        this.props.dispatch(Creators.fetch())
    }

    render() {
        return <CategoryOption currentCategory= {this.props.match.params.id} categories={this.props.categories}></CategoryOption>
    }
}

function mapStateToProps ({ categories }) {
    return {
        categories
    }
}

export default withRouter(connect(mapStateToProps)(CategoryOptionContainer))
