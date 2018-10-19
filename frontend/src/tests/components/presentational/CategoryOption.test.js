import React from 'react'
import CategoryOption from '../../../components/presentational/CategoryOption'
import {Link} from "react-router-dom"
import ReactRouterEnzymeContext from 'react-router-enzyme-context'
import categories from '../../mocks/categories'

describe('[Presentation Component] CategoryOption', () => {
    const context = new ReactRouterEnzymeContext();

    

    it('Shallow renders correctly', () => {
        expect(shallow(<CategoryOption />));
    });

    it('Expect to find Links inside', () => {
        const props = {
            categories,
            currentCategory : "all"
        }

        const wrapper = mount(<CategoryOption {...props} />,context.get());
        expect(wrapper.find(Link)).toHaveLength(categories.length+1);
    });

    it('Expect to all Link has an active class', () => {
        const props = {
            categories,
            currentCategory : "all"
        }
        const to        = `/post/category/${props.currentCategory}`
        const wrapper   = mount(<CategoryOption {...props} />,context.get());
        expect(wrapper.find('.active').find(Link).prop('to')).toEqual(to);
    });
    
});
