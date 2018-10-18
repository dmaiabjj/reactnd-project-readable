import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import {Types as UserType,Creators}         from '../../../store/features/user'
import reducer                              from '../../../store/features/user'

const INITIAL_STATE = {name:'Udacity', avatar:'udacity'};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    user : INITIAL_STATE
});

describe('User', () => {

    beforeEach(() => {
        store.clearActions();
    })

    it('[Reducer] should handle initial state', () => {
        expect(reducer(undefined,{user: INITIAL_STATE}))
            .toEqual(INITIAL_STATE);
    });

    it('[Reducer] should handle FETCH action', () => {
        expect(reducer({},{type:UserType.FETCH,user: INITIAL_STATE}))
        .toEqual(INITIAL_STATE);
    });

    it('[Action Creator FETCH] should dispatch a LOADING -> FETCH_SUCCESS  action ', 
        () => {
            expect((Creators.fetch())).toEqual({type:UserType.FETCH,user: INITIAL_STATE});
        });

})