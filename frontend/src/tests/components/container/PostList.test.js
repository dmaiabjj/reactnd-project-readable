import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import ConnectedPost,{PostList} from '../../../components/container/PostList';
import Post from '../../../components/presentational/Post';
import SearchNotFound from '../../../components/presentational/SearchNotFound';
import postsMock from '../../mocks/posts';

describe('[Container Component] PostList', () => {
	const context 			= new ReactRouterEnzymeContext();
	const posts 				= Object.keys(postsMock).map((id) => postsMock[id])
	let props 					= {}

	beforeEach(() => {
		props = {
				category: "all",
				filter: "votes",
				order: "asc",
				posts,
				app : {
					fetched: true,
					loading: false,
					error:{}
				},
				authUser: {name:"Udacity",avatar: "udacity"}
		};
	})

	it('Shallow renders correctly', () => {
    expect(global.shallow(<PostList {...props} />));
	});

	it('Shallow renders correctly with default values', () => {
		props = {
			app : {
				fetched: true,
				loading: false,
				error:{}
			},
			posts : posts,
			authUser: {name:"Udacity",avatar: "udacity"}
		}

    expect(global.shallow(<PostList {...props} />));
  });

  it('Renders correctly', () => {
    expect(global.shallow(<PostList {...props} />)).toMatchSnapshot();
	});

	it('Expect to find same number os Post Component equals to posts', () => {
    const wrapper = global.shallow(<PostList {...props}/>, context.get());
    expect(wrapper.find(Post)).toHaveLength(posts.length);
	});

	it('Expect to not find Post Component', () => {

		props = {
			...props,posts :[]
		}

    const wrapper = global.shallow(<PostList {...props} />, context.get());
		expect(wrapper.find(Post)).toHaveLength(props.posts.length);
		expect(wrapper.find(SearchNotFound)).toHaveLength(1);
	});


	it('Expect to find same number of Post Component equals to posts in store', () => {


		const mockStore = configureMockStore([thunk]);
		const store = mockStore({
				posts,
				app : {
					fetched: true,
					loading: false,
					error:{}
				},
				user: {name:"Udacity",avatar: "udacity"}
		});

		props = {
			...props,posts :[]
		}

    const wrapper = global.shallow(<ConnectedPost store={store} {...props} />, context.get());
		expect(wrapper.find(Post)).toHaveLength(props.posts.length);
	});

});
