import React from 'react'
import Select from 'react-select';
import FilterBy from '../../../components/presentational/FilterBy'

describe('[Presentation Component] FilterBy', () => {

    const search = (filter,order) => {

    }
    it('Shallow renders correctly', () => {
        expect(shallow(<FilterBy search={search} />));
    });

    it('Expect to find a Link inside', () => {
        const wrapper = mount(<FilterBy search={search}/>);
        expect(wrapper.find(Select)).toHaveLength(2);
    });


    
});
