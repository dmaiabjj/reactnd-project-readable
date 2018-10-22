import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import _ from 'lodash';
import PostDetail from '../../../components/presentational/PostDetail';
import posts from '../../mocks/posts';
import { formatDate } from '../../../utilities/helpers';

describe('[Presentation Component] PostDetail', () => {
  const context = new ReactRouterEnzymeContext();
  let props 		= {}

	beforeEach(() => {
		props = {
			post: posts['8xf0y6ziyjabvozdd253nd'],
			authUser : {name: "Udacity",avatar: "udacity"},
			onVotePost: jest.fn(),
			onReactPost: jest.fn(),
			onDeletePost: jest.fn(),
		};
	})

  it('Shallow renders correctly', () => {
    expect(global.shallow(<PostDetail {...props} />,context.get()));
  });

	it('Expect to find a Link owner inside', () => {
		props = {
			...props,authUser : {name : "thingone",avatar:"thingone"}
		}
    const wrapper = global.mount(<PostDetail {...props} />, context.get());
    expect(wrapper.find(Link)).toHaveLength(2);
  });

  it('Expect to not find a Link owner inside', () => {
    const wrapper = global.mount(<PostDetail {...props} />, context.get());
    expect(wrapper.find(Link)).toHaveLength(1);
	});


	it('Check if the onVotePost is been called', () => {
    const wrapper = global.mount(<PostDetail {...props} />, context.get());
    wrapper.find('.post-add-icon.inline-items > a:first-child').simulate('click');
    expect(props.onVotePost).toHaveBeenCalledTimes(1);
	});


	it('Check if the onReactPost is been called', () => {
    const wrapper = global.mount(<PostDetail {...props} />, context.get());
    wrapper.find('.choose-reaction.reaction-colored li:first-child > a').simulate('click');
    expect(props.onReactPost).toHaveBeenCalledTimes(1);
	});


	it('Check if the onDeletePost is been called', () => {
		props = {
			...props,authUser : {name : "thingone",avatar:"thingone"}
		}
    const wrapper = global.mount(<PostDetail {...props} />, context.get());
    wrapper.find('.more-dropdown li:last-child a').simulate('click');
    expect(props.onDeletePost).toHaveBeenCalledTimes(1);
	});


	it('Expect to find all post data', () => {
    const wrapper = global.mount(<PostDetail {...props} />, context.get());
    expect(wrapper.find('.post-category.bg-primary > a').text()).toBeDefined();
    expect(wrapper.find('.post-category.bg-primary > a').text()).not.toBeNull();
    expect(wrapper.find('.post-category.bg-primary > a').text()).toEqual(props.post.category);
    expect(wrapper.find('.author-date > span').text()).toBeDefined();
    expect(wrapper.find('.author-date > span').text()).not.toBeNull();
    expect(wrapper.find('.author-date > span').text()).toEqual(props.post.author);
    expect(wrapper.find('.post__date > time').text()).toBeDefined();
    expect(wrapper.find('.post__date > time').text()).not.toBeNull();
    expect(wrapper.find('.post__date > time').text()).toEqual(formatDate(props.post.timestamp));
    expect(wrapper.find('.post-title').text()).toBeDefined();
    expect(wrapper.find('.post-title').text()).not.toBeNull();
    expect(wrapper.find('.post-title').text()).toEqual(props.post.title);
    expect(wrapper.find('.post-content').text()).toBeDefined();
    expect(wrapper.find('.post-content').text()).not.toBeNull();
    expect(wrapper.find('.post-content').text()).toEqual(props.post.body);
	  expect(wrapper.find('.filter-icons li:first-child .post-add-icon + span').text()).toBeDefined();
    expect(wrapper.find('.filter-icons li:first-child .post-add-icon + span').text()).not.toBeNull();
    expect(wrapper.find('.filter-icons li:first-child .post-add-icon + span').text()).toEqual(
      String(props.post.votes.reduce((acc, vote) => acc + vote.value, 0)),
		);
		expect(wrapper.find('.olymp-speech-balloon-icon ~ span').text()).toBeDefined();
    expect(wrapper.find('.olymp-speech-balloon-icon ~ span').text()).not.toBeNull();
    expect(wrapper.find('.olymp-speech-balloon-icon ~ span').text()).toEqual(
      String(props.post.commentCount),
    );
  });

});
