import React,{PureComponent} from 'react'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import  AddPost  from '../presentational/AddPost'

import {Creators as CategoryCreators,} from '../../store/features/category'
import {Creators as PostCreators,getPostById} from '../../store/features/post'

/**
* @description
* Componente que representa o container do formulário para inserção do Post
*/
export class AddPostContainer extends PureComponent {

    componentDidMount() {
				const {match:{params:{id}},fetchPost,getAllCategories} = this.props;
        id && fetchPost(id);
        getAllCategories();
    }

    componentWillUnmount(){
        this.setState({post : {}});
    }

     /**
    * @description
    * Faz o bind do objeto post para realizar a inserção ou atualização
    * @param {Object} post  Post
    */
    onHandlePost = (post) =>{
        const {addPost,updatePost,history} = this.props ;
        const path = `/post/detail/${post.id}`;
        if(post.is_new)
            addPost(post);
        else
            updatePost(post);


        this.setState({post : {}});
        history.push(path);


    }

    render() {
        const {categories,user,post} = this.props;
        return (
            <AddPost
                categories={categories}
                user={user}
                onHandlePost={this.onHandlePost}
                post={post}
            />
        )
   }
}

function mapStateToProps (state,ownProps) {
    const {categories,user} = state;
    const {match:{params:{id}}} = ownProps;
    return {
        categories : categories.map((cat) => ({
            'value' : cat.name,
            'label' : cat.name.toUpperCase()
        })),
        user,
        post : getPostById(id)(state),
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
        },
        fetchPost: (id) => {
            dispatch(PostCreators.fetchById(id))
        }
    }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddPostContainer))
