import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import PostConnected,{Post} from '../../../components/pages/Post';
import Head from '../../../components/presentational/Head';
import Footer from '../../../components/presentational/Footer';
import PostDetail from '../../../components/presentational/PostDetail';
import LoadingLinear from '../../../components/presentational/LoadingLinear';
import AddPostButton from '../../../components/presentational/AddPostButton';
import SearchNotFound from '../../../components/presentational/SearchNotFound';

import CommentContainer from '../../../components/container/CommentContainer';


import posts from '../../mocks/posts';

describe('[Page Component] Post', () => {
	const context 			= new ReactRouterEnzymeContext();
	let props 					= {}

	beforeEach(() => {
		props = {
			post: posts["8xf0y6ziyjabvozdd253nd"],
			app : {
				loading : false,
				fetched : true,
			},
			authUser : {name: "Udacity",avatar: "udacity"},
			match : {
				params : {
					id : "all"
				}
			},
			deletePost : jest.fn(),
			votePost : jest.fn(),
			reactPost : jest.fn(),
			fetchPost : jest.fn()
		};
	})

	it('Shallow renders correctly', () => {
    expect(global.shallow(<Post {...props} />,context.get()));
	});

	it('Renders correctly', () => {
    expect(global.shallow(<Post {...props} />),context.get()).toMatchSnapshot();
	});

	it('Shallow renders correctly', () => {
    expect(global.shallow(<PostConnected {...props} />,context.get()));
	});

	it('Shallow renders all components correctly', () => {
		const wrapper = global.shallow(<Post {...props} />,context.get());
		expect(wrapper.find(Head)).toHaveLength(1);
    expect(wrapper.find(Footer)).toHaveLength(1);
		expect(wrapper.find(PostDetail)).toHaveLength(1);
		expect(wrapper.find(AddPostButton)).toHaveLength(1);
		expect(wrapper.find(CommentContainer)).toHaveLength(1);
		expect(wrapper.find(SearchNotFound)).toHaveLength(0);
		expect(wrapper.find(LoadingLinear)).toHaveLength(0);
	});

	it('Shallow renders all components correctly', () => {
		props = {
			...props,app : {loading : true}
		}
		const wrapper = global.shallow(<Post {...props} />,context.get());
		expect(wrapper.find(LoadingLinear)).toHaveLength(1);
	});

	it('Shallow renders all components correctly', () => {
		props = {
			...props,post : undefined
		}
		const wrapper = global.shallow(<Post {...props} />,context.get());
		expect(wrapper.find(SearchNotFound)).toHaveLength(1);
	});

	it('Check if the fetchPost is been called', () => {
		props = {
			...props,post : undefined
		}
		expect(global.shallow(<Post {...props} />,context.get()));
		expect(props.fetchPost).toHaveBeenCalledTimes(1);
	});


});
