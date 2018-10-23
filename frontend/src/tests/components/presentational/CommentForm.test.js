import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

import CommentForm from '../../../components/presentational/CommentForm';
import CircularProgress from '@material-ui/core/CircularProgress';

import comments from '../../mocks/comments';

describe('[Presentation Component] CommentForm', () => {
  const context = new ReactRouterEnzymeContext();
	const comment = comments["894tuq4ut84ut8v4t8wun89g"]
	let props 		= {}

	beforeEach(() => {
		props = {
			comment,
			user : {name: "Udacity",avatar: "udacity"},
			postId: comment.parentId,
			onHandleComment: jest.fn(),
			loading: false,
		};
	})

  it('Shallow renders correctly', () => {
    expect(global.shallow(<CommentForm {...props} />,context.get()));
	});

	it('Expect to not find a CircularProgress inside when not loading', () => {
    const wrapper = global.mount(<CommentForm {...props} />, context.get());
		expect(wrapper.find(CircularProgress)).toHaveLength(0);
	});

	it('Expect to find a CircularProgress inside when loading', () => {
		props = {
			...props,loading : true
		}

    const wrapper = global.mount(<CommentForm {...props} />, context.get());
		expect(wrapper.find(CircularProgress)).toHaveLength(1);
	});

	it('Check if the onHandleComment is been called', () => {

		const wrapper = global.mount(<CommentForm {...props} />, context.get());
    wrapper.find('button').simulate('click');
    expect(props.onHandleComment).toHaveBeenCalledTimes(1);
	});

	it('Expect to find all comment data', () => {
    const wrapper = global.mount(<CommentForm {...props} />, context.get());
    expect(wrapper.find('.form-group > input').props().defaultValue).toBeDefined();
    expect(wrapper.find('.form-group > input').props().defaultValue).not.toBeNull();
		expect(wrapper.find('.form-group > input').props().defaultValue).toEqual(props.user.name);

		expect(wrapper.find('.form-group > textarea').props().value).toBeDefined();
    expect(wrapper.find('.form-group > textarea').props().value).not.toBeNull();
    expect(wrapper.find('.form-group > textarea').props().value).toEqual(props.comment.body);
  });

});
