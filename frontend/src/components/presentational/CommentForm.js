import React,{Component} from 'react'
import PropTypes from 'prop-types';
import {genUUID} from '../../utilities/helpers'

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
      }).isRequired,
      postId               : PropTypes.string.isRequired,
      onHandleComment      : PropTypes.func.isRequired
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
* @param {String} comment                   Comment a ser atualizado
* @param {String} postId                    Id do post a ser inserido o comentário
* @param {Function} onHandleComment         Método responsável por adicionar/atualizar um comentário
*/
class CommentForm extends Component {

    state = {
        comment : this.props.comment
    }

    componentWillReceiveProps(props) {
        this.setState({comment : props.comment}) ;
    }
    
    /**
    * @description 
    * Faz o bind do objeto comentário para realizar a inserção ou atualização
    * @param {Event} event  Evento do click do botão
    */
    bindComment(event){
        event.preventDefault();
        const {onHandleComment,user,postId} = this.props
        const {comment}                     = this.state
        const is_new                        = comment.id ?(false) :(true)
        const id                            = is_new ?(genUUID()) :(comment.id)
        const update                        = Object.assign(comment,
            {
                timestamp : + new Date(),
                author : user.name,
                parentId : postId,
                id,
                is_new
            }
        );
        this.setState({comment : {body: ""}})
        onHandleComment(update)
    }

    /**
    * @description 
    * Recebe o evento que representa a digitação do body do comment
    * 
    * @param   {Event} event Evento 
    */
    onInputSearchChange = (event) => {
        event.preventDefault();
        const {comment} = this.state
        this.setState({comment : Object.assign(comment,{body : event.target.value})}) ;
    };

    render() {
        const {user}    = this.props
        const {comment} = this.state
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
                            <textarea className="form-control" placeholder="Your Comment" value={comment.body} onChange={this.onInputSearchChange}>
                               
                            </textarea>
                        </div>
                        <a href="" className="btn btn-blue btn-lg full-width" onClick={(event) => this.bindComment(event)}>Post your Comment</a>
                    </div>
                </div>
            
            </div>
        )
    }

}


CommentForm.propTypes    = propTypes;
CommentForm.defaultProps = defaultProps;

export default CommentForm