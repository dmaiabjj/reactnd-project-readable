import React,{Component} from 'react'
import PropTypes from 'prop-types';

const propTypes = {
    comment : PropTypes.shape({
        id: PropTypes.string,
        parentId : PropTypes.string,
        timestamp: PropTypes.number,
        body: PropTypes.string.isRequired,
        author: PropTypes.string,
        voteScore: PropTypes.number
      }),
      user : PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
};

const defaultProps  = {
    comment : {
        body : ""
    },
    user : {
        name: ""
    }
};

/**
* @description 
* Componente que representa o form de cadastrou ou atualização de um comment
* @param {string} comment         Comment a ser atualizado
*/
class CommentForm extends Component {

    state = {
        body : this.props.comment.body
    }

    componentWillReceiveProps(props) {
        this.setState({body : this.props.comment.body}) ;
    }
        

    /**
    * @description 
    * Recebe o evento que representa a digitação do body do comment
    * 
    * @param   {Event} event Evento 
    */
    onInputSearchChange = (event) => {
        event.preventDefault();
        this.setState({body : event.target.value}) ;
    };

    render() {
        const {user} = this.props
        return (
            <div className="ui-block">
                <div className="crumina-module crumina-heading with-title-decoration">
                    <h5 className="heading-title">Write a Comment</h5>
                </div>
                <div className="row">
                    <div className="col col-12 col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div className="form-group label-floating">
                            <label className="control-label">Name</label>
                            <input className="form-control" placeholder="Your Name" readOnly defaultValue={user.name} type="text" />
                        </div>
                    </div>
                    <div className="col col-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group label-floating">
                            <label className="control-label">Comment</label>
                            <textarea className="form-control" placeholder="Your Comment" value={this.props.comment.body} onChange={this.onInputSearchChange}>
                               
                            </textarea>
                        </div>
                        <a href="" className="btn btn-blue btn-lg full-width">Post your Comment</a>
                    </div>
                </div>
            
            </div>
        )
    }

}


CommentForm.propTypes    = propTypes;
CommentForm.defaultProps = defaultProps;

export default CommentForm