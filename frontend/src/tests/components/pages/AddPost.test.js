import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import ConnectedAddPost,{AddPost} from '../../../components/pages/AddPost';
import Head from '../../../components/presentational/Head';
import AddPostContainer from '../../../components/container/AddPostContainer';
import Footer from '../../../components/presentational/Footer';


describe('[Page Component] AddPost', () => {
	const context 			= new ReactRouterEnzymeContext();
	let props 					= {}

	it('Shallow renders correctly', () => {
    expect(global.shallow(<AddPost {...props} />));
	});

	it('Shallow renders correctly', () => {
    expect(global.shallow(<ConnectedAddPost {...props} />));
	});

	it('Renders correctly', () => {
    expect(global.shallow(<ConnectedAddPost {...props} />)).toMatchSnapshot();
	});

	it('Shallow renders all components correctly', () => {
		const wrapper = global.shallow(<AddPost {...props} />,context.get());
		expect(wrapper.find(Head)).toHaveLength(1);
    expect(wrapper.find(AddPostContainer)).toHaveLength(1);
		expect(wrapper.find(Footer)).toHaveLength(1);
	});

});
