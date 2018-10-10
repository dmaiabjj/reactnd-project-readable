import React,{Fragment, PureComponent} from 'react'
import Select from 'react-select';


/**
* @description 
* Componente que representa o formulário para inserção do Post
*/
class AddPostContainer extends PureComponent {

    properties = [
        { value: 'timestamp', label: 'Data' },
        { value: 'voteScore', label: 'Vote' }
      ];

      customStyles = {
        option: (base) => ({
          ...base,
          padding: 20
        }),
        control: (base,state) => {
            return {
                ...base,
                height : '60px',
                backgroundColor: 'transparent',
                height : '60px',
                fontSize:'.812rem',
                lineHeight:'1.5',
                color:'#495057',
                backgroundColor:'#fff',
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
                                                    defaultValue={this.properties[0]}
                                                    options={this.properties}
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
                                            <a href="#" className="btn btn-secondary btn-lg full-width">Cancel</a>
                                        </div>
                                        <div className="col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                                            <a href="#" className="btn btn-blue btn-lg full-width">Post Topic</a>
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


export default AddPostContainer
