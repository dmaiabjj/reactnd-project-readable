import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

import comments                             from '../../mocks/comments'
import {Types as CommentType,Creators}      from '../../../store/features/comment'
import {Types as SharedType}                from '../../../store/features/shared'
import reducer                              from '../../../store/features/comment'

const INITIAL_STATE = {};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    comments : INITIAL_STATE
});


describe('Comment reducer', () => {

    beforeEach(() => {
        fetch.resetMocks()
    })

    it('[Reducer] should handle initial state', () => {
            expect(reducer(undefined,{}))
                .toEqual({});
    });

    it('[Reducer] should handle FETCH action', () => {
        expect(reducer({},{type:CommentType.FETCH}))
        .toEqual({});
    });

    it('[Reducer] should handle FETCH_SUCCESS action', () => {
        expect(reducer({},{type:CommentType.FETCH_SUCCESS,comments}))
        .toEqual(comments);
    });

    it('[Action Creator] should dispatch a LOADING -> FETCH_SUCCESS  action ', 
        () => {
            fetch.mockResponse(JSON.stringify(comments));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: CommentType.FETCH_SUCCESS,comments}
            ];

            return store.dispatch(Creators.fetch())
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });

    
    it('[Action Creator] should dispatch a FETCH_SUCCESS action ', 
        () => {
            expect(Creators.fetchSuccess(comments))
                .toEqual({comments,type: CommentType.FETCH_SUCCESS});
    });


})