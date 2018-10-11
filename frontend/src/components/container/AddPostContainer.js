import React,{PureComponent} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import  AddPost  from '../presentational/AddPost'

import {Creators as SharedCreators} from '../../store/features/shared'
import {Creators as CategoryCreators} from '../../store/features/category'
import {Creators as PostCreators} from '../../store/features/post'

/**
* @description 
* Componente que representa o container do formulário para inserção do Post
*/
class AddPostContainer extends PureComponent {

    componentDidMount() {
        this.props.getAllCategories()
    }

    render() {
        const {categories} = this.props

         return (
                <AddPost
                    categories={categories}
                />
         )
   }
}

function mapStateToProps (state) {
    const {categories} = state;
    return {
        categories : categories.map((cat) => ({
            'value' : cat.name,
            'label' : cat.name.toUpperCase()
        }))
    }
}

function mapDispatchToProps (dispatch) {
    return {
       getAllCategories: ()   =>  dispatch(CategoryCreators.fetch())
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddPostContainer))
