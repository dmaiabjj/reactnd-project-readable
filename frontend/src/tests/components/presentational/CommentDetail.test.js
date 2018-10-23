import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import {formatDate} from '../../../utilities/helpers'

import CommentDetail from '../../../components/presentational/CommentDetail';
import LoadingCircular from '../../../components/presentational/LoadingCircular'

import comments from '../../mocks/comments';

describe('[Presentation Component] CommentDetail', () => {
  const context = new ReactRouterEnzymeContext();
	const comment = comments["894tuq4ut84ut8v4t8wun89g"]
	let props 		= {}

	beforeEach(() => {
		props = {
			comment,
			authUser : {name: "Udacity",avatar: "udacity"},
			onDeleteComment: jest.fn(),
			onBindComment: jest.fn(),
			onVoteComment: jest.fn(),
			loading: false,
		};
	})

  it('Shallow renders correctly', () => {
    expect(global.shallow(<CommentDetail {...props} />,context.get()));
	});

	it('Expect to not find a LoadingCircular inside when not loading', () => {
    const wrapper = global.mount(<CommentDetail {...props} />, context.get());
		expect(wrapper.find(LoadingCircular)).toHaveLength(0);
	});

	it('Check if the onDeleteComment is been called', () => {
		const wrapper = global.mount(<CommentDetail {...props} />, context.get());
    wrapper.find('.more-dropdown > li:last-child > a').simulate('click');
		expect(props.onDeleteComment).toHaveBeenCalledTimes(1);
		expect(wrapper.find(LoadingCircular)).toHaveLength(1);
	});


	it('Check if the onBindComment is been called', () => {
		const wrapper = global.mount(<CommentDetail {...props} />, context.get());
    wrapper.find('.more-dropdown > li:first-child > a').simulate('click');
		expect(props.onBindComment).toHaveBeenCalledTimes(1);
	});

	it('Check if the onVoteComment is been called', () => {
		const wrapper = global.mount(<CommentDetail {...props} />, context.get());
    wrapper.find('.comment-item > a').at(0).simulate('click');
		expect(props.onVoteComment).toHaveBeenCalledTimes(1);
	});

	it('Expect to find all post data', () => {
    const wrapper = global.mount(<CommentDetail {...props} />, context.get());
    expect(wrapper.find('.post__author-name').text()).toBeDefined();
    expect(wrapper.find('.post__author-name').text()).not.toBeNull();
		expect(wrapper.find('.post__author-name').text()).toEqual(props.comment.author);
		expect(wrapper.find('.published').text()).toBeDefined();
    expect(wrapper.find('.published').text()).not.toBeNull();
		expect(wrapper.find('.published').text()).toEqual(formatDate(props.comment.timestamp));
		expect(wrapper.find('.comment-item > p').text()).toBeDefined();
    expect(wrapper.find('.comment-item > p').text()).not.toBeNull();
		expect(wrapper.find('.comment-item > p').text()).toEqual(props.comment.body);
		expect(wrapper.find('.comment-item > span').text()).toBeDefined();
    expect(wrapper.find('.comment-item > span').text()).not.toBeNull();
		expect(wrapper.find('.comment-item > span').text()).toEqual(
      String(props.comment.votes.reduce((acc, vote) => acc + vote.value, 0)),
		);
	});


});
