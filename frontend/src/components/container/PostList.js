import React,{Fragment,PureComponent} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

import SearchNotFound from '../presentational/SearchNotFound'
import Post from '../presentational/Post'

import {Creators as PostCreators,getPostByFilter} from '../../store/features/post'

const propTypes = {
    category : PropTypes.string,
    filter : PropTypes.any.isRequired,
    order : PropTypes.string.isRequired
}

const defaultProps  = {
    category: "all",
    filter: function (obj) {
        return obj.votes && obj.votes.reduce((acc,vote) => {
            return acc + vote.value
        },0)
      },
    order:  "desc"
}



/**
* @description
* Componente que representa a lista de posts carregados
* @param {String} category              Categoria atual
* @param {String || Function} filter    Campo a ser usado como filtro na busca dos posts
* @param {String} order                 Campo que representa a ordenação do filtro de posts
*/
export class PostList extends PureComponent {


    /**
    * @description
    * Verifica se foi feito o fetch e se o resultado contém posts e mostra a pagina de acordo com o retorno
    * @returns {React.Component}     Retorna um componente React de acordo com o resultado
    */
    ShowComponent = () => {
				const {app,posts,authUser,deletePost} = this.props;
        if(app.fetched && posts.length <= 0)
            return <SearchNotFound/>;
        else{

            return (
                posts.map(post => (
                    <Post
                        key={post.id}
                        post={post}
                        isOwner={post.author === authUser.name}
                        onDeletePost={deletePost}
                    />
                ))
            );
        }
    }

    render() {
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
PostList.defaultProps = defaultProps;

export default connect(mapStateToProps,mapDispatchToProps)(PostList)
