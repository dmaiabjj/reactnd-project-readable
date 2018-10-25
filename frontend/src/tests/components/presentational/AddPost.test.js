import React from 'react'
import AddPost from '../../../components/presentational/AddPost'
import ReactRouterEnzymeContext from 'react-router-enzyme-context'


import posts from '../../mocks/posts';
import categoriesMock from '../../mocks/categories';

describe('[Presentation Component] AddPost', () => {
    const context 			= new ReactRouterEnzymeContext();
		const categories 		= categoriesMock.map((c) => ({"value" : c.name,"label" : c.name}))
		let props 					= {}
		beforeEach(() => {
			props = {
				post: posts["8xf0y6ziyjabvozdd253nd"],
				categories,
				user : {name: "Udacity",avatar: "udacity"},
				onHandlePost : jest.fn()
			};
		})

		it('Shallow renders correctly', () => {
        expect(shallow(<AddPost {...props} />,context.get()));
    });


		it('Expect to find all post data', () => {
			const wrapper = global.mount(<AddPost {...props} />, context.get());
			expect(wrapper.find('input.form-control').props().value).toBeDefined();
			expect(wrapper.find('input.form-control').props().value).not.toBeNull();
			expect(wrapper.find('input.form-control').props().value).toEqual(props.post.title);
			expect(wrapper.find('input').filterWhere(n => n.props().name === "category").props().value).toBeDefined();
			expect(wrapper.find('input').filterWhere(n => n.props().name === "category").props().value).not.toBeNull();
			expect(wrapper.find('input').filterWhere(n => n.props().name === "category").props().value).toEqual(props.post.category);

			expect(wrapper.find('textarea.form-control').props().value).toBeDefined();
			expect(wrapper.find('textarea.form-control').props().value).not.toBeNull();
			expect(wrapper.find('textarea.form-control').props().value).toEqual(props.post.body);
		});

		it('Expect to find default values', () => {

			props = {
				...props,post:{title: '', body : '', category : ''}
			}
			const wrapper = global.mount(<AddPost {...props} />, context.get());
			expect(wrapper.find('input.form-control').props().value).toBeDefined();
			expect(wrapper.find('input.form-control').props().value).not.toBeNull();
			expect(wrapper.find('input.form-control').props().value).toEqual(props.post.title);
			expect(wrapper.find('input').filterWhere(n => n.props().name === "category").props().value).toBeDefined();
			expect(wrapper.find('input').filterWhere(n => n.props().name === "category").props().value).not.toBeNull();
			expect(wrapper.find('input').filterWhere(n => n.props().name === "category").props().value).toEqual(categories[0].value);

			expect(wrapper.find('textarea.form-control').props().value).toBeDefined();
			expect(wrapper.find('textarea.form-control').props().value).not.toBeNull();
			expect(wrapper.find('textarea.form-control').props().value).toEqual(props.post.body);
		});

});
