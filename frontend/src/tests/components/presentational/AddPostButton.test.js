import React from 'react'
import AddPostButton from '../../../components/presentational/AddPostButton'
import {Link} from "react-router-dom"
import ReactRouterEnzymeContext from 'react-router-enzyme-context'

describe('[Presentation Component] AddPostButton', () => {
    const context = new ReactRouterEnzymeContext();

    it('Shallow renders correctly', () => {
        expect(shallow(<AddPostButton />));
    });

    it('Expect to find a Link inside', () => {
        const wrapper = mount(<AddPostButton/>,context.get());
        expect(wrapper.find(Link)).toHaveLength(1);
    });


    it('Expect to find a img', () => {
        
        const wrapper = mount(<AddPostButton />,context.get());
        
        expect(wrapper.find('.back-to-top > img').prop('src')).toBeDefined();
        expect(wrapper.find('.back-to-top > img').prop('src')).not.toBeNull();

    });
    
});
