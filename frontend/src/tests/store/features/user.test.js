import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import categories                           from '../../mocks/categories'
import {Types as UserType,Creators}         from '../../../store/features/user'
import {Types as SharedType}                from '../../../store/features/shared'
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
            expect(reducer(undefined,{}))
                .toEqual(INITIAL_STATE);
    });

    it('[Reducer] should handle FETCH action', () => {
        expect(reducer({},{type:SharedType.FETCH}))
        .toEqual({});
    });


})