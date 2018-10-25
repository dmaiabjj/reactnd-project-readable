import React,{PureComponent} from 'react'
import Select from 'react-select';
import PropTypes from 'prop-types';


const propTypes = {
		search   		: PropTypes.func.isRequired,
		properties 	: PropTypes.array.isRequired,
		ordination 	: PropTypes.array.isRequired,
}

const defaultProps  = {
		search : (filter,order) => {},
		properties : [{value: "",label:""}],
		ordination : [{value: "",label:""}]
}

/**
* @description
* Componente que irá mostrar as opções de ordenação das categorias
*
* @constructor
* @param {Function} search    Função que irá fazer o filtro de uma categoria específica
*/
class FilterBy extends PureComponent {
    state = {
        propertySelected: "votes",
        ordinationSelected: "desc"
      }

    /**
    * @description
    * Seta a opção do filtro a ser usado na busca dos posts e realiza a busca
    * @param {String} option  opção selecionada do dropdown
    */
    handlePropertyChange = (option) => {
        this.setState({ propertySelected : option.value });
        this.props.search(option.value,this.state.ordinationSelected);
    }

    /**
    * @description
    * Seta a opção da ordenação a ser usado na busca dos posts e realiza a busca
    * @param {String} option  opção selecionada do dropdown
    */
    handleOrdinationChange = (option) => {
        this.setState({ ordinationSelected : option.value });
        this.props.search(this.state.propertySelected, option.value);
    }

    render () {
				const {properties,ordination} = this.props
        return (
            <div className="ui-block responsive-flex">
                <div className="ui-block-title">
                    <div className="h6 title">FilterBy: </div>
                    <div className="w-select">
                        <div className="form-group label-floating is-select">
                            <Select
                                defaultValue={properties[0]}
                                options={properties}
                                onChange={this.handlePropertyChange}
                            />
                        </div>
                    </div>
                    <div className="h6 title">Ordem: </div>
                    <div className="w-select">
                        <div className="form-group label-floating is-select">
														<Select
                                defaultValue={ordination[0]}
                                options={ordination}
                                onChange={this.handleOrdinationChange}
                            />
						</div>
                    </div>
                </div>
            </div>
        )
    }
}

FilterBy.propTypes    = propTypes;
FilterBy.defaultProps = defaultProps;

export default FilterBy
