import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import ConnectedHome,{Home} from '../../../components/pages/Home';
import Head from '../../../components/presentational/Head';
import CategoryOption from '../../../components/presentational/CategoryOption';
import FilterBy from '../../../components/presentational/FilterBy';
import PostList from '../../../components/container/PostList';
import AddPostButton from '../../../components/presentational/AddPostButton';
import Footer from '../../../components/presentational/Footer';
import LoadingLinear from '../../../components/presentational/LoadingLinear';

import categories from '../../mocks/categories';

describe('[Page Component] Home', () => {
	const context 			= new ReactRouterEnzymeContext();
	let props 					= {}
	beforeEach(() => {
		props = {
			categories,
			app : {
				loading : false,
			},
			match : {
				params : {
					id : "all"
				}
			},
			getAllData : jest.fn()
		};
	})

	it('Shallow renders correctly', () => {
    expect(global.shallow(<Home {...props} />));
	});

	it('Renders correctly', () => {
    expect(global.shallow(<Home {...props} />)).toMatchSnapshot();
	});

	it('Shallow renders correctly', () => {
    expect(global.shallow(<ConnectedHome {...props} />));
	});

	it('Renders correctly', () => {
    expect(global.shallow(<ConnectedHome {...props} />)).toMatchSnapshot();
	});

	it('Shallow renders all components correctly', () => {
		const wrapper = global.shallow(<Home {...props} />,context.get());
		expect(wrapper.find(Head)).toHaveLength(1);
    expect(wrapper.find(CategoryOption)).toHaveLength(1);
		expect(wrapper.find(FilterBy)).toHaveLength(1);
		expect(wrapper.find(PostList)).toHaveLength(1);
		expect(wrapper.find(AddPostButton)).toHaveLength(1);
		expect(wrapper.find(Footer)).toHaveLength(1);
		expect(wrapper.find(LoadingLinear)).toHaveLength(0);
	});

	it('Shallow renders when data is fetching correctly', () => {
		props = {
			...props,app : {loading : true}
		}

		const wrapper = global.shallow(<Home {...props} />,context.get());
		expect(wrapper.find(LoadingLinear)).toHaveLength(1);
	});

	it('Check if the getAllData is been called', () => {
		expect(global.shallow(<Home {...props} />,context.get()));
		expect(props.getAllData).toHaveBeenCalledTimes(1);
	});

});
