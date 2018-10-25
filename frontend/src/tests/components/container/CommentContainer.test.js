import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import CommentContainerConnect ,{CommentContainer}from '../../../components/container/CommentContainer';
import CommentList from '../../../components/container/CommentList';
import CommentForm from '../../../components/presentational/CommentForm';

import commentsMock from '../../mocks/comments';

describe('[Container Component] CommentList', () => {
  const context 	= new ReactRouterEnzymeContext();
	const comments 	= Object.keys(commentsMock).map((id) => commentsMock[id])
	let props 			= {}

	beforeEach(() => {
		props = {
			postId: "8xf0y6ziyjabvozdd253nd",
			user : {name: "Udacity",avatar: "udacity"},
			app:{loading: false},
			comments
		};
	})

  it('Shallow renders correctly', () => {
    expect(global.shallow(<CommentContainer {...props} />,context.get()));
	});


	it('Shallow renders correctly', () => {

		const mockStore = configureMockStore([thunk]);
		const store = mockStore({
			user: {name:"Udacity",avatar: "udacity"}
		});

		expect(global.shallow(<CommentContainerConnect store={store} postId={"sa"} />,context.get()));
	});

	it('Renders correctly', () => {
    expect(global.shallow(<CommentContainer {...props} />)).toMatchSnapshot();
	});

	it('Shallow renders correctly', () => {

		const mockStore = configureMockStore([thunk]);
		const store = mockStore({
			app: {}
		});

		expect(global.shallow(<CommentContainerConnect store={store} {...props} />)).toMatchSnapshot();
	});

	it('Expect to find CommentList and CommentForm nested', () => {
		const wrapper = global.shallow(<CommentContainer {...props} />);
		expect(wrapper.find(CommentList)).toHaveLength(1);
		expect(wrapper.find(CommentForm)).toHaveLength(1);
	});




});
