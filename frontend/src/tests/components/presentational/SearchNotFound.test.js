import React from 'react'
import SearchNotFound from '../../../components/presentational/SearchNotFound'
import {Link} from "react-router-dom"
import ReactRouterEnzymeContext from 'react-router-enzyme-context'

describe('[Presentation Component] SearchNotFound', () => {
    const context = new ReactRouterEnzymeContext();

    it('Shallow renders correctly', () => {
        expect(shallow(<SearchNotFound />));
    });

    it('Expect to find a Link inside', () => {
        const wrapper = mount(<SearchNotFound/>,context.get());
        expect(wrapper.find(Link)).toHaveLength(1);
    });

});
