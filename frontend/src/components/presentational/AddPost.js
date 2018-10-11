import React,{Fragment, PureComponent} from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types';
import {genUUID} from '../../utilities/helpers'

const propTypes = {
    categories : PropTypes.arrayOf(PropTypes.shape({
        value : PropTypes.string.isRequired,
        label : PropTypes.string.isRequired,
    })).isRequired,
    post : PropTypes.shape({
        id: PropTypes.string,
        category: PropTypes.string,
        author: PropTypes.string,
        timestamp: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        votes: PropTypes.arrayOf(PropTypes.shape({
            user : PropTypes.string,
            option : PropTypes.string,
            value : PropTypes.number
        })),
        commentCount : PropTypes.number
      }),
      user : PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar : PropTypes.string.isRequired
      }).isRequired,
      onHandlerPost : PropTypes.func.isRequired,
      loading: PropTypes.bool.isRequired

};

const defaultProps  = {
    loading: false,
    user: {name: '',avatar: ''},
    categories: [],
    post : {}
};

/**
* @description 
* Componente que representa o formulário de Adição do Post
* @constructor
* @param {Object} post              Post a ser atualizado
* @param {Array} categories         Categorias que podem ser adicionadas no novo post
* @param {Boolean} loading          Se é necessário mostrar o loading
* @param {Object} user          Usuário logado
* @param {Function} onHandlerPost   Método responsável por adicionar/atualizar um post
*/

class AddPost extends PureComponent {

    state = {
        post: {}
    }

    componentWillReceiveProps(props) {
      const {categories,post}   = props
      let category              = categories.find((c) => c.value === (post.category)) || categories[0]
      this.setState({post : {
            ...props.post,
            ...{category:category.value
        }}}) ;
    }

    /**
    * @description 
    * Faz o bind do objeto post para realizar a inserção ou atualização
    * @param {Event} event  Evento do click do botão
    */
    bindPost(event){
        event.preventDefault();
        
        const {onHandlePost,user} = this.props
        const {post}              = this.state
        const is_new              = post.id ?(false) :(true)
        const id                  = is_new ?(genUUID()) :(post.id)
        const update              = Object.assign(post,
            {
                timestamp : + new Date(),
                author : user.name,
                id,
                is_new,
                category: post.category.value
            }
        );
        this.setState({post: {title: '',category: '', body: ''}})
        onHandlePost(update)
    }


    /**
    * @description 
    * Recebe o evento que representa a digitação do title do post
    * @param   {Event} event Evento 
    */
    onInputTitleChange = (event) => {
        event.preventDefault();
        const {post} = this.state
        this.setState({post : {
            ...post,
            ...{title:event.target.value}
        }}) ;
    };

    
     /**
    * @description 
    * Recebe o valor que representa a categoria escolhida
    * @param   {Object} option Categoria selecionada 
    */

    onInputCategoryChange = (option) => {
        const {post} = this.state
        this.setState({post : {
            ...post,
            ...{category:option.value
        }}}) ;
      }

    /**
    * @description 
    * Recebe o evento que representa a digitação do body do post
    * @param   {Event} event Evento 
    */
    onInputBodyChange = (event) => {
        event.preventDefault();
        const {post} = this.state
        this.setState({post : {
            ...post,
            ...{body:event.target.value}
        }}) ;
    };
   
    

    customStyles = {
        placeholder : (base) => ({
            ...base,
            padding: '0 0 0 10px'
        }),
        option: (base) => ({
          ...base,
          padding: 20
        }),
        control: (base) => {
            return {
                ...base,
                backgroundColor: 'transparent',
                height : '60px',
                fontSize:'.812rem',
                lineHeight:'1.5',
                color:'#495057',
                border:'1px solid #e6ecf5',
                borderRadius:'.25rem',
                transition:'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
                '&:hover' : {
                 }
            }
        },
        singleValue: (base) => ({
            ...base,
            backgroundColor: 'transparent',
            margin: '10px 0 0 10px',
            zIndex: '1',
            top: '10px',
            color: '#515365',
            fontWeight: 'normal',
            cursor: 'pointer'
        }),
      }

    render() {
        const {post}        = this.state
        const {categories}  = this.props
        const defaultValue  = categories.find((c) => c.value === post.category)
        console.log(post)
        return (
            <Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="ui-block responsive-flex1200">
                                <div className="ui-block-title">
                                    <div className="h6 title">Posts</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row row sorting-container">
                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                            <div className="ui-block">
                                <div className="ui-block-title bg-blue">
                                    <h6 className="title c-white">Create a New Topic</h6>
                                </div>
                                <div className="ui-block-content">
                                    <div className="row">
                                        <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <div className="form-group label-floating">
                                                <label className="control-label">Título do Post</label>
                                                <input className="form-control" type="text" placeholder="Título" value={post.title} onChange={this.onInputTitleChange} />
                                            </div>
                                        </div>
                                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group label-floating is-select">
                                                <label className="control-label">Select Category</label>
                                                <Select
                                                    value={defaultValue}
                                                    options={categories}
                                                    styles={this.customStyles}
                                                    onChange={this.onInputCategoryChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group label-floating">
                                                <label className="control-label">Body do Post</label>
                                                <textarea className="form-control" placeholder="Body" value={post.body} onChange={this.onInputBodyChange}></textarea>
                                            </div>
                                        </div>
                                        <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <a href="" className="btn btn-secondary btn-lg full-width">Cancel</a>
                                        </div>
                                        <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <a href="" className="btn btn-blue btn-lg full-width">Post Topic</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

AddPost.propTypes    = propTypes;
AddPost.defaultProps = defaultProps;

export default AddPost
