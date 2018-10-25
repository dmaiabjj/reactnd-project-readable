import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import AddPostContainerConnect ,{AddPostContainer}from '../../../components/container/AddPostContainer';
import AddPost from '../../../components/presentational/AddPost';

import categoriesMock from '../../mocks/categories';
import posts from '../../mocks/posts';

describe('[Container Component] AddPostContainer', () => {
  const context 		= new ReactRouterEnzymeContext();
	const categories 	= categoriesMock.map((c) => ({"value" : c.name,"label" : c.name}))
	const postId			=	"8xf0y6ziyjabvozdd253nd"
	let props 			= {}

	beforeEach(() => {
		props = {
			post: posts[postId],
			categories,
			user : {name: "Udacity",avatar: "udacity"},
			app:{loading: false},
			fetchPost: jest.fn(),
			match:{params: { post_id : postId}},
			getAllCategories: jest.fn(),
			addPost: jest.fn(),
			updatePost: jest.fn(),
			history: {push : jest.fn()}
		};
	})

  it('Shallow renders correctly', () => {
    expect(global.shallow(<AddPostContainer {...props} />,context.get()));
	});

	it('Shallow renders correctly', () => {

		const mockStore = configureMockStore([thunk]);
		const store = mockStore({
			user: {name:"Udacity",avatar: "udacity"}
		});

		expect(global.shallow(<AddPostContainerConnect store={store} postId={"sa"} />,context.get()));
	});

	it('Renders correctly', () => {
    expect(global.shallow(<AddPostContainer {...props} />)).toMatchSnapshot();
	});

	it('Shallow renders correctly', () => {

		const mockStore = configureMockStore([thunk]);
		const store = mockStore({
			categories,
			user:props.user
		});

		expect(global.shallow(<AddPostContainerConnect store={store} {...props} />)).toMatchSnapshot();
	});

	it('Expect to find AddPost nested', () => {
		const wrapper = global.shallow(<AddPostContainer {...props} />);
		expect(wrapper.find(AddPost)).toHaveLength(1);
	});

	it('Check if the getAllCategories is been called', () => {
		global.mount(<AddPostContainer {...props} />, context.get());
    expect(props.getAllCategories).toHaveBeenCalledTimes(1);
	});

	it('Check if the fetchPost is been called', () => {
		global.mount(<AddPostContainer {...props} />, context.get());
    expect(props.fetchPost).toHaveBeenCalledTimes(1);
	});




});
