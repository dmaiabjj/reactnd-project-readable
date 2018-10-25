import React from 'react'
import Select from 'react-select';
import FilterBy from '../../../components/presentational/FilterBy'

describe('[Presentation Component] FilterBy', () => {

		const search = jest.fn()

		const properties = [
			{ value: 'votes', label: 'Vote' },
			{ value: 'timestamp', label: 'Data' },
			{ value: 'reactions', label: 'Reações' },
			{ value: 'commentCount', label: 'Comentários' }
		]

		const ordination = [
				{ value: 'desc', label: 'Decrescente' },
				{ value: 'asc', label: 'Crescente' }

		]

		it('Shallow renders correctly', () => {
        expect(shallow(<FilterBy search={search} properties={properties} ordination={ordination} />));
    });

    it('Expect to find a Link inside', () => {
				const wrapper = mount(<FilterBy search={search} properties={properties} ordination={ordination}/>);
        expect(wrapper.find(Select)).toHaveLength(2);
		});

		it('Testing input handle changing', () => {
			const property = "property";
			const order 		= "order";
			const wrapper 	= mount(<FilterBy search={search} properties={properties} ordination={ordination}/>);
			wrapper.instance().handlePropertyChange({value:property})
			wrapper.instance().handleOrdinationChange({value:order})
			expect(wrapper.state().propertySelected).toEqual(property)
			expect(wrapper.state().ordinationSelected).toEqual(order)
	});




});
