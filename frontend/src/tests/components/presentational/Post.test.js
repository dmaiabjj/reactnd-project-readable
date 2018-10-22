import React from 'react';
import { Link } from 'react-router-dom';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import _ from 'lodash';
import Post from '../../../components/presentational/Post';
import LoadingCircular from '../../../components/presentational/LoadingCircular';
import posts from '../../mocks/posts';
import { formatDate } from '../../../utilities/helpers';

describe('[Presentation Component] Post', () => {
  const context = new ReactRouterEnzymeContext();
  const props = {
    post: posts['8xf0y6ziyjabvozdd253nd'],
    isOwner: true,
    loading: false,
    onDeletePost: jest.fn(),
  };

  it('Shallow renders correctly', () => {
    expect(global.shallow(<Post {...props} />));
  });

  it('Renders correctly', () => {
    expect(global.shallow(<Post {...props} />)).toMatchSnapshot();
  });

  it('Expect to find a Link owner inside', () => {
    const wrapper = global.mount(<Post {...props} />, context.get());
    expect(wrapper.find(Link)).toHaveLength(3);
  });

  it('Expect to not find a Link owner inside', () => {
    const wrapper = global.mount(
      <Post
        post={props.post}
        isOwner={false}
        loading={props.loading}
        onDeletePost={props.onDeletePost}
      />,
      context.get(),
    );
    expect(wrapper.find(Link)).toHaveLength(2);
  });

  it('Expect to find a Loader and Links inside', () => {
    const wrapper = global.mount(
      <Post post={props.post} isOwner={props.isOwner} loading onDeletePost={props.onDeletePost} />,
      context.get(),
    );
    expect(wrapper.containsMatchingElement(LoadingCircular)).toBeTruthy();
    expect(wrapper.containsMatchingElement(Link)).toBeTruthy();
  });

  it('Check if the onDeletePost is been called', () => {
    const wrapper = global.mount(<Post {...props} />, context.get());
    wrapper.find('.more-dropdown li:last-child a').simulate('click');
    expect(props.onDeletePost).toHaveBeenCalledTimes(1);
  });

  it('Expect to find a project name, description and an image inside', () => {
    const wrapper = global.mount(<Post {...props} />, context.get());
    expect(wrapper.find('.post-category.bg-primary > a').text()).toBeDefined();
    expect(wrapper.find('.post-category.bg-primary > a').text()).not.toBeNull();
    expect(wrapper.find('.post-category.bg-primary > a').text()).toEqual(props.post.category);
    expect(wrapper.find('.author-date > span').text()).toBeDefined();
    expect(wrapper.find('.author-date > span').text()).not.toBeNull();
    expect(wrapper.find('.author-date > span').text()).toEqual(props.post.author);
    expect(wrapper.find('.post__date > time').text()).toBeDefined();
    expect(wrapper.find('.post__date > time').text()).not.toBeNull();
    expect(wrapper.find('.post__date > time').text()).toEqual(formatDate(props.post.timestamp));
    expect(wrapper.find('.hentry > h4').text()).toBeDefined();
    expect(wrapper.find('.hentry > h4').text()).not.toBeNull();
    expect(wrapper.find('.hentry > h4').text()).toEqual(props.post.title);
    expect(wrapper.find('.description').text()).toBeDefined();
    expect(wrapper.find('.description').text()).not.toBeNull();
    expect(wrapper.find('.description').text()).toEqual(
      _.truncate(props.post.body, {
        length: 300,
      }),
		);
	  expect(wrapper.find('#olymp-heart-icon ~ span').text()).toBeDefined();
    expect(wrapper.find('#olymp-heart-icon ~ span').text()).not.toBeNull();
    expect(wrapper.find('#olymp-heart-icon ~ span').text()).toEqual(
      String(props.post.votes.reduce((acc, vote) => acc + vote.value, 0)),
		);
		expect(wrapper.find('.names-people-likes').text()).toBeDefined();
    expect(wrapper.find('.names-people-likes').text()).not.toBeNull();
    expect(wrapper.find('.names-people-likes').text()).toEqual(
      String(props.post.reactions.reduce((acc, vote) => acc + 1, 0)),
		);
		expect(wrapper.find('.olymp-speech-balloon-icon ~ span').text()).toBeDefined();
    expect(wrapper.find('.olymp-speech-balloon-icon ~ span').text()).not.toBeNull();
    expect(wrapper.find('.olymp-speech-balloon-icon ~ span').text()).toEqual(
      String(props.post.commentCount),
    );
  });
});
