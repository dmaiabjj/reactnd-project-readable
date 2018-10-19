import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import _ from 'lodash'

import categories                           from '../../mocks/categories'
import posts                                from '../../mocks/posts'
import {Types as CategoryType}              from '../../../store/features/category'
import {Types as PostType}                  from '../../../store/features/post'
import {Types as SharedType,Creators}       from '../../../store/features/shared'
import reducer                              from '../../../store/features/shared'

const INITIAL_STATE = {
    loading : false,
    error   : null,
    fetched : false
}

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    INITIAL_STATE
});

describe('Shared', () => {

    beforeEach(() => {
        store.clearActions();
    })

    /*  REDUCERS  */

    it('[Reducer] should handle initial state', () => {
            expect(reducer(undefined,{}))
                .toEqual(INITIAL_STATE);
    });


    it('[Reducer] should handle LOADING action', () => {
        const loading = true
        const expected = {
            loading,
            fetched: false
        }
        expect(reducer({},{type:SharedType.LOADING,loading}))
        .toEqual(expected);
    });

    it('[Reducer] should handle ACTION_FAILURE action', () => {
        const expected = {
            error,
            fetched: true,
            loading : false
        }
        expect(reducer({},{type:SharedType.ACTION_FAILURE,error}))
        .toEqual(expected);
    });


    it('[Reducer] should handle POST/FETCH_SUCCESS action', () => {
        const expected = {
            fetched: true,
            loading : false
        }
        expect(reducer({},{type:PostType.FETCH_SUCCESS}))
        .toEqual(expected);
    });


    it('[Reducer] should handle POST(ADD_SUCCESS,UPDATE_SUCCESS) && CATEGORY(FETCH_SUCCESS) && COMMENT(FETCH_SUCCESS,ADD_SUCCESS,UPDATE_SUCCESS,DELETE_SUCCESS) action', () => {
        const expected = {
            loading : false
        }
        expect(reducer({},{type:PostType.ADD_SUCCESS}))
        .toEqual(expected);
    });


    /*  REDUCERS  */

     /*  ACTION CREATORS  */

    it('[Action Creator] should dispatch a LOADING -> CATEGORY/FETCH_SUCCESS && POST/FETCH_SUCCESS  action ', 
        () => {
            const arrayPosts = _.orderBy(Object.keys(posts).map(id => posts[id]))

            fetch
                .once(JSON.stringify({categories}))
                .once(JSON.stringify(posts))

            

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: CategoryType.FETCH_SUCCESS,categories},
                {type: PostType.FETCH_SUCCESS,posts}
            ];

            return store.dispatch(Creators.handleInitialData())
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });


    it('[Action Creator] should dispatch a LOADING -> ACTION_FAILURE  action ', 
        () => {
            const expected = JSON.stringify({error})
            fetch.mockReject(expected);

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : expected}
            ];

            return store.dispatch(Creators.handleInitialData())
                .then(() => {
                    expect(store.getActions()).toEqual(expectedActions)
                })

            
        
    });

     /*  ACTION CREATORS  */

})