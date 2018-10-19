import React from 'react'
import Footer from '../../../components/presentational/Footer'

describe('[Presentation Component] Footer', () => {

    it('Shallow renders correctly', () => {
        expect(shallow(<Footer />));
    });

    it('Expect to find a project name', () => {
        const props = {
            project     : "Udacity"
        }
        const wrapper = mount(<Footer {...props} />);
        
        expect(wrapper.find('.sub-footer-copyright > span').text()).toBeDefined();
        expect(wrapper.find('.sub-footer-copyright > span').text()).not.toBeNull();
        expect(wrapper.find('.sub-footer-copyright > span').text()).toEqual(props.project);

    });
    
});
