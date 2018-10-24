import React,{Fragment} from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types';
import {Formik} from 'formik'
import * as Yup from 'yup';

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
      onHandlePost : PropTypes.func.isRequired

}

const defaultProps  = {
    user: {name: '',avatar: ''},
    categories: [],
    post : {title: '', body : '', category : ''},
    onHandlePost : (post) => {}
}

/**
* @description
* Componente que representa o formulário de Adição do Post
* @constructor
* @param {Object} post              Post a ser atualizado
* @param {Array} categories         Categorias que podem ser adicionadas no novo post
* @param {Object} user              Usuário logado
* @param {Function} onHandlePost    Método responsável por adicionar/atualizar um post
*/

function AddPost({post,categories,onHandlePost,user})  {

    /**
    * @description
    * Faz o bind do objeto post para realizar a inserção ou atualização
    * @param {Function} onHandlePost    Método responsável por adicionar/atualizar um post
    * @param {Object} user              Usuário logado
    * @param {Object} post              Post a ser atualizado
    * @param {Array} categories         Categorias que podem ser adicionadas no novo post
    * @returns {Function}  Retorna uma função que irá receber os valores do formik, dar um bind no objecto e chamar o método local de inserção/update
    */
    const bindHandlerPost = (onHandlePost,user,post,categories) => {
        return (values,{resetForm}) => {
            const is_new                    = post.id ?(false) :(true);
            const id                        = is_new ?(genUUID()) :(post.id);
            const update                    = Object.assign(post,
                {
                    timestamp : + new Date(),
                    author : user.name,
                    id,
                    title : values.title,
                    body : values.body,
                    is_new,
                    category: values.category.value
                }
            );
						resetForm({title:'',body: '',category:categories[0]});
            onHandlePost(update);
        }
    }

    const handlerPost = bindHandlerPost(onHandlePost,user,post,categories);

    /* Style do Select importado da biblioteca ReacSelect */
    const customStyles = {
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

    /* Schema de validaçào do formulário de inserção do cadastro */
    const validationSchema = Yup.object().shape({
        title: Yup.string()
            .required('Título é obrigatório'),
        body: Yup.string()
            .required('Body é obrigatório'),
        category: Yup.string()
            .required('Categoria é obrigatório')
    })

		const defaultValue   = categories.find((c) => c.value === (post.category)) || categories[0];
    return (
        defaultValue ?
            <Formik
                initialValues={{title: post.title || '',body : post.body || '',category:defaultValue || '' }}
                validationSchema={validationSchema}
                onSubmit={handlerPost}
            >
                {props => {
                    const {values,errors,touched,handleSubmit,handleChange,handleBlur,handleReset,setFieldValue} = props;
                    return(
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
                                                        <div className={`form-group label-floating ${touched.title ? (errors.title) ? ('has-error') :('has-success'):''}`}>
                                                            <label className="control-label">Título do Post</label>
                                                            <input
                                                                name="title"
                                                                className="form-control"
                                                                type="text"
                                                                placeholder="Título"
                                                                value={values.title}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                />
                                                        </div>
                                                    </div>
                                                    <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className="form-group label-floating is-select">
                                                            <label className="control-label">Select Category</label>
                                                            <Select
																																id="category"
                                                                name="category"
                                                                value={values.category}
                                                                options={categories}
                                                                styles={customStyles}
                                                                onChange={(option) => setFieldValue('category', option)}
                                                                onBlur={handleBlur}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                                        <div className={`form-group label-floating ${touched.body ? (errors.body) ? ('has-error') :('has-success'):''}`}>
                                                            <label className="control-label">Body do Post</label>
                                                            <textarea
                                                                name="body"
                                                                className="form-control"
                                                                placeholder="Body"
                                                                value={values.body}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                            >
                                                            </textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <button
                                                            className="btn btn-secondary btn-lg full-width"
                                                            onClick={handleReset}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                    <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                                        <button
                                                            type="button"
                                                            className="btn btn-blue btn-lg full-width"
                                                            onClick={handleSubmit}>
                                                                Post Topic
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    )
                }}
            </Formik> :
                <Fragment></Fragment>
    )
}

AddPost.propTypes    = propTypes;
AddPost.defaultProps = defaultProps;

export default AddPost
