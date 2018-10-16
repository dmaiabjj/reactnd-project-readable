import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import categories                           from '../../mocks/categories'
import {Types as CategoryType,Creators}     from '../../../store/features/category'
import {Types as SharedType}                from '../../../store/features/shared'
import reducer                              from '../../../store/features/category'

const INITIAL_STATE = [];

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    categories : INITIAL_STATE
});


describe('Category reducer', () => {

    beforeEach(() => {
        fetch.resetMocks()
    })

    it('[Reducer] should handle initial state', () => {
            expect(reducer(undefined,{}))
                .toEqual([]);
    });

    it('[Reducer] should handle FETCH action', () => {
        expect(reducer([],{type:CategoryType.FETCH}))
        .toEqual([]);
    });

    it('[Reducer] should handle FETCH_SUCCESS action', () => {
        expect(reducer([],{type:CategoryType.FETCH_SUCCESS,categories}))
        .toEqual(categories);
    });

    it('[Action Creator] should dispatch a LOADING -> FETCH_SUCCESS  action ', 
        () => {
            fetch.mockResponse(JSON.stringify({categories}));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: CategoryType.FETCH_SUCCESS,categories}
            ];

            return store.dispatch(Creators.fetch())
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });


    it('[Action Creator] should dispatch a FETCH_SUCCESS action ', 
        () => {
            expect(Creators.fetchSuccess(categories))
                .toEqual({categories,type: CategoryType.FETCH_SUCCESS});
    });


})