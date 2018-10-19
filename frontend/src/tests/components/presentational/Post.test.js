import React from 'react'
import Post from '../../../components/presentational/Post'
import LoadingCircular from '../../../components/presentational/LoadingCircular'
import posts from '../../mocks/posts'
import {Link} from 'react-router-dom'
import ReactRouterEnzymeContext from 'react-router-enzyme-context'

describe('[Presentation Component] Post', () => {
    const context = new ReactRouterEnzymeContext();
    const props = {
        post : posts['8xf0y6ziyjabvozdd253nd'],
        isOwner : true,
        loading : false,
        onDeletePost : jest.fn() 
    }

    it('Shallow renders correctly', () => {
        expect(shallow(<Post {...props} />));
    });


    it('Expect to find a Link owner inside', () => {
        const wrapper = mount(<Post {...props} />,context.get());
        expect(wrapper.find(Link)).toHaveLength(3);
    });

    it('Expect to not find a Link owner inside', () => {
        const wrapper = mount(<Post 
                                    post={props.post} 
                                    isOwner={false} 
                                    loading={props.loading} 
                                    onDeletePost={props.onDeletePost} 
                                />,context.get());
        expect(wrapper.find(Link)).toHaveLength(2);
    });
    

    it('Expect to find a Loader and Links inside', () => {
          const wrapper = mount(<Post 
                                    post={props.post} 
                                    isOwner={props.isOwner} 
                                    loading={true} 
                                    onDeletePost={props.onDeletePost} 
                                />,context.get());
        expect(wrapper.containsMatchingElement(LoadingCircular)).toBeTruthy();
        expect(wrapper.containsMatchingElement(Link)).toBeTruthy();
    });

    /*it('Check if the onDeletePost is been called', () => {
        const wrapper = mount(<Post {...props} />,context.get());
        console.log(wrapper.find('.more-dropdown a[alt]').length)
        wrapper.find('.more-dropdown > a').simulate('click');
        expect(props.onDeletePost).toHaveBeenCalledTimes(1)
    });

*/
    


    
});
