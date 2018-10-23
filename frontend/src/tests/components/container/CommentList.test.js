import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import CommentListConnect ,{CommentList}from '../../../components/container/CommentList';
import CommentDetail from '../../../components/presentational/CommentDetail';

import commentsMock from '../../mocks/comments';

describe('[Container Component] CommentList', () => {
  const context 	= new ReactRouterEnzymeContext();
	const comments 	= Object.keys(commentsMock).map((id) => commentsMock[id])
	let props 			= {}

	beforeEach(() => {
		props = {
			comments,
			authUser : {name: "Udacity",avatar: "udacity"},
			onDeleteComment: jest.fn(),
			voteComment: jest.fn(),
			getComments: jest.fn(),
			loading: false,
		};
	})

  it('Shallow renders correctly', () => {
    expect(global.shallow(<CommentList {...props} />,context.get()));
	});

	it('Shallow renders correctly', () => {

		const mockStore = configureMockStore([thunk]);
		const store = mockStore({
			user: {name:"Udacity",avatar: "udacity"}
		});

		expect(global.shallow(<CommentListConnect store={store} postId={"sa"} />,context.get()));
	});

	it('Renders correctly', () => {
    expect(global.shallow(<CommentList {...props} />)).toMatchSnapshot();
	});

	it('Shallow renders correctly', () => {

		const mockStore = configureMockStore([thunk]);
		const store = mockStore({
			user: {name:"Udacity",avatar: "udacity"}
		});

		expect(global.shallow(<CommentListConnect store={store} {...props} />)).toMatchSnapshot();
	});

	it('Expect to find same number os Comment Component equals to comments', () => {
    const wrapper = global.shallow(<CommentList {...props}/>);
    expect(wrapper.find(CommentDetail)).toHaveLength(props.comments.length);
	});

	it('Expect to not find Comment Component', () => {

		props = {
			...props,comments :[]
		}

    const wrapper = global.shallow(<CommentList {...props} />);
		expect(wrapper.find(CommentDetail)).toHaveLength(props.comments.length);
	});

	it('Expect to find label of comments quantity', () => {

		const wrapper = global.mount(<CommentList {...props} />, context.get());
    expect(wrapper.find('.heading-title').text()).toBeDefined();
    expect(wrapper.find('.heading-title').text()).not.toBeNull();
		expect(wrapper.find('.heading-title').text()).toEqual(`Comments (${props.comments.length})`);
	});


});
