import React from 'react'
import Head from '../../../components/presentational/Head'
import {Link} from "react-router-dom"
import ReactRouterEnzymeContext from 'react-router-enzyme-context'

describe('[Presentation Component] Head', () => {
    const context = new ReactRouterEnzymeContext();

    it('Shallow renders correctly', () => {
        expect(shallow(<Head />));
    });

    it('Expect to find a Link inside', () => {
        const wrapper = mount(<Head/>,context.get());
        expect(wrapper.find(Link)).toHaveLength(1);
    });


    it('Expect to find a project name, description and an image inside', () => {
        const props = {
            project     : "Udacity",
            description : "Udacity Project",
            img         : "/img/test.png"
        }
        const wrapper = mount(<Head {...props} />,context.get());
        
        expect(wrapper.find('.main-header-content > h1').text()).toBeDefined();
        expect(wrapper.find('.main-header-content > h1').text()).not.toBeNull();
        expect(wrapper.find('.main-header-content > h1').text()).toEqual(props.project);

        expect(wrapper.find('.main-header-content > p').text()).toBeDefined();
        expect(wrapper.find('.main-header-content > p').text()).not.toBeNull();
        expect(wrapper.find('.main-header-content > p').text()).toEqual(props.description);

        expect(wrapper.find('.main-header > img').prop('src')).toBeDefined();
        expect(wrapper.find('.main-header > img').prop('src')).not.toBeNull();
        expect(wrapper.find('.main-header > img').prop('src')).toEqual(props.img);

    });
    
});
