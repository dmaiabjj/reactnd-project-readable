import React,{Fragment, PureComponent} from 'react'
import Select from 'react-select';
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import {Creators as SharedCreators} from '../../store/features/shared'
import {Creators as CategoryCreators} from '../../store/features/category'
import {Creators as PostCreators} from '../../store/features/post'
/**
* @description 
* Componente que representa o formulário para inserção do Post
*/
class AddPostContainer extends PureComponent {

    componentDidMount() {
        this.props.getAllCategories()
    }

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
        const {categories} = this.props
        const defaultValue = categories[0]
        console.log(defaultValue)
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
                                                <input className="form-control" type="text" placeholder="Título" />
                                            </div>
                                        </div>
                                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group label-floating is-select">
                                                <label className="control-label">Select Category</label>
                                                <Select
                                                    value={defaultValue}
                                                    options={categories}
                                                    styles={this.customStyles}
                                                />
                                            </div>
                                        </div>
                                        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="form-group label-floating">
                                                <label className="control-label">Body do Post</label>
                                                <textarea className="form-control" placeholder="Body"></textarea>
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

function mapStateToProps (state) {
    const {categories} = state;
    console.log(categories)
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
