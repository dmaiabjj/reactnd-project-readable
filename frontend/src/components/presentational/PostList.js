import React,{Fragment,PureComponent} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import SearchNotFound from './SearchNotFound'
import Post from './Post'

import {Creators as PostCreators,getPostByFilter} from '../../store/features/post'


const propTypes = {
    category : PropTypes.string,
    filter : PropTypes.string.isRequired,
    order : PropTypes.string.isRequired
};



/**
* @description 
* Componente que representa a lista de posts carregados
* @param {string} category          Categoria atual
* @param {string} filter            Campo a ser usado como filtro na busca dos posts
* @param {string} order             Campo que representa a ordenação do filtro de posts
*/
class PostList extends PureComponent {

    
    ShowComponent = () => {
        const {app,posts,authUser,deletePost} = this.props;

        if(app.fetched && posts.length <= 0)
            return <SearchNotFound/>
        else{
            return (
                posts.map(post => (
                    <Post key={post.id} post={post} isOwner={post.author === authUser.name} onDeletePost={deletePost}></Post>
                ))
            )
        }
    }

    render() {
        console.log("PostList: ",this.props)
        return (
            <Fragment>
                 {this.ShowComponent()}
            </Fragment>
        )
    }

}

function mapStateToProps (state,ownProps) {
    const {user,app} = state;
    const {category,filter,order} = ownProps;
    return {
        posts : getPostByFilter(category,filter,order)(state),
        authUser : user,
        app
    }
}
    
function mapDispatchToProps (dispatch) {
    return {
        deletePost: (id,event) => {
            event.preventDefault();
            dispatch(PostCreators.delete(id))
        }
    }
}


PostList.propTypes    = propTypes;

export default connect(mapStateToProps,mapDispatchToProps)(PostList)