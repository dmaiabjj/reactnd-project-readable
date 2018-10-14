import React,{PureComponent} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import  AddPost  from '../presentational/AddPost'

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

     /**
    * @description 
    * Faz o bind do objeto comentário para realizar a inserção ou atualização
    * @param {Event} post  Post
    */
    onHandlePost = (post) =>{
        const {addPost,updatePost} = this.props 
        console.log(post)
        if(post.is_new)
            addPost(post);
        else
            updatePost(post);

        this.setState({post : {}})
    
    }

    render() {
        const {categories,user} = this.props
        return (
            <AddPost
                categories={categories}
                user={user}
                onHandlePost={this.onHandlePost}
            />
        )
   }
}

function mapStateToProps (state) {
    const {categories,user} = state;
    return {
        categories : categories.map((cat) => ({
            'value' : cat.name,
            'label' : cat.name.toUpperCase()
        })),
        user
    }
}

function mapDispatchToProps (dispatch) {
    return {
       getAllCategories: ()   =>  dispatch(CategoryCreators.fetch()),
       addPost: (post) => {
            dispatch(PostCreators.add(post))
        },
        updatePost: (post) => {
            dispatch(PostCreators.update(post))
        }
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddPostContainer))
