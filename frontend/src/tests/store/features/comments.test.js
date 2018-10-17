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
        store.clearActions();
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

    it('[Action Creator FETCH] should dispatch a LOADING -> FETCH_SUCCESS  action ', 
        () => {

            fetch.mockResponse(JSON.stringify(comments));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: CommentType.FETCH_SUCCESS,comments}
            ];

            return store.dispatch(Creators.fetch())
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });

    
    it('[Action Creator FETCH] should dispatch a FETCH_SUCCESS action ', 
        () => {
            expect(Creators.fetchSuccess(comments))
                .toEqual({comments,type: CommentType.FETCH_SUCCESS});
    });

    it('[Action Creator FETCH] should fetch dispatch a LOADING -> ACTION_FAILURE  action ', 
        () => {
            const expected = JSON.stringify({error});
            fetch.mockReject(expected);

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : expected}
            ];

            return store.dispatch(Creators.fetch())
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });

    it('[Action Creator ADD] should dispatch a LOADING -> ADD_SUCCESS  action ', 
        () => {
            const comment = 
            {
                id: '1',
                parentId: "2",
                timestamp: 1468166872634,
                body: 'Hi there! I am a COMMENT.',
                author: 'thingtwo',
                votes:[]
            }

            const expected = {
                ...comments,
                [comment.id] : comment
            }

            fetch.mockResponse(JSON.stringify(expected));
            

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: CommentType.ADD_SUCCESS,comment : expected }
            ];

            return store.dispatch(Creators.add(comment))
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });

    
    it('[Action Creator ADD] should dispatch a ADD_SUCCESS action ', 
        () => {

            const comment = 
            {
                id: '1',
                parentId: "2",
                timestamp: 1468166872634,
                body: 'Hi there! I am a COMMENT.',
                author: 'thingtwo',
                votes:[]
            }

            expect(Creators.addSuccess(comment))
                .toEqual({comment,type: CommentType.ADD_SUCCESS});
    });

    it('[Action Creator ADD] should dispatch a LOADING -> ACTION_FAILURE  action ', 
        () => {

            const comment = 
            {
                id: '1',
                parentId: "2",
                timestamp: 1468166872634,
                body: 'Hi there! I am a COMMENT.',
                author: 'thingtwo',
                votes:[]
            }
            
            fetch.mockReject(JSON.stringify({error}));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
            ];

            return store.dispatch(Creators.add(comment))
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });


    it('[Action Creator UPDATE] should dispatch a LOADING -> UPDATE_SUCCESS  action ', 
        () => {
            const comment = 
            {
                author: 'thingtwo',
                body: 'Hi there! I am a new Comment.',
                deleted: false,
                id: '894tuq4ut84ut8v4t8wun89g',
                parentDeleted: false,
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1468166872634,
                votes:[],
                deleted: false,
                
            }


            fetch.mockResponse(JSON.stringify(comment));
            

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: CommentType.UPDATE_SUCCESS,comment}
            ];

            return store.dispatch(Creators.update(comment))
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });

    
    it('[Action Creator UPDATE] should dispatch a UPDATE_SUCCESS action ', 
        () => {

            const comment = 
            {
                id: '1',
                parentId: "2",
                timestamp: 1468166872634,
                body: 'Hi there! I am a COMMENT.',
                author: 'thingtwo',
                votes:[]
            }

            expect(Creators.updateSuccess(comment))
                .toEqual({comment,type: CommentType.UPDATE_SUCCESS});
    });

    it('[Action Creator ADD] should dispatch a LOADING -> ACTION_FAILURE  action ', 
        () => {

            const comment = 
            {
                author: 'thingtwo',
                body: 'Hi there! I am a new Comment.',
                deleted: false,
                id: '894tuq4ut84ut8v4t8wun89g',
                parentDeleted: false,
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1468166872634,
                votes:[],
                deleted: false,
                
            }
            
            fetch.mockReject(JSON.stringify({error}));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
            ];

            return store.dispatch(Creators.update(comment))
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });


    it('[Action Creator VOTE] should dispatch a LOADING -> VOTE_SUCCESS  action ', 
        () => {
           
            const id    = "894tuq4ut84ut8v4t8wun89g"
            const votes = [{name : "diego",option : "upVote",value: 1}];

            fetch.mockResponse(JSON.stringify({id,votes}));
            

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {id,votes,type: CommentType.VOTE_SUCCESS}
            ];

            return store.dispatch(Creators.vote(id,votes[0].name,votes[0].option))
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });

    it('[Action Creator VOTE] should dispatch a VOTE_SUCCESS action ', 
        () => {

            const id    = "894tuq4ut84ut8v4t8wun89g"
            const votes = [{name : "diego",option : "upVote",value: 1}];

            expect(Creators.voteSuccess(id,votes))
                .toEqual({id,votes,type: CommentType.VOTE_SUCCESS});
    });


    it('[Action Creator VOTE] should dispatch a LOADING -> ACTION_FAILURE  action ', 
        () => {

            const id    = "894tuq4ut84ut8v4t8wun89g"
            const votes = [{name : "diego",option : "upVote",value: 1}];
            
            fetch.mockReject(JSON.stringify({error}));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
            ];

            return store.dispatch(Creators.vote(id,votes[0].name,votes[0].option))
                .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });


    it('[Action Creator DELETE] should dispatch a LOADING -> DELETE_SUCCESS  action ', 
        () => {
        
           const comment = {
                    author: 'thingtwo',
                    body: 'Hi there! I am a COMMENT.',
                    deleted: false,
                    id: '894tuq4ut84ut8v4t8wun89g',
                    parentDeleted: false,
                    parentId: "8xf0y6ziyjabvozdd253nd",
                    timestamp: 1468166872634,
                    votes:[],
                    deleted: false,
                    
            }

            fetch.mockResponse(JSON.stringify(comment));
            

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {comment,type: CommentType.DELETE_SUCCESS}
            ];

            return store.dispatch(Creators.delete(comment.id))
                .then(() => expect(store.getActions()).toEqual(expectedActions))
    
    });


    it('[Action Creator DELETE] should dispatch a DELETE_SUCCESS action ', 
        () => {

            const comment = {
                    author: 'thingtwo',
                    body: 'Hi there! I am a COMMENT.',
                    deleted: false,
                    id: '894tuq4ut84ut8v4t8wun89g',
                    parentDeleted: false,
                    parentId: "8xf0y6ziyjabvozdd253nd",
                    timestamp: 1468166872634,
                    votes:[],
                    deleted: false,
                    
            }


            expect(Creators.deleteSuccess(comment))
                .toEqual({comment,type: CommentType.DELETE_SUCCESS});
    });


    it('[Action Creator DELETE] should dispatch a LOADING -> ACTION_FAILURE  action ', 
    () => {

            const comment = {
                author: 'thingtwo',
                body: 'Hi there! I am a COMMENT.',
                deleted: false,
                id: '894tuq4ut84ut8v4t8wun89g',
                parentDeleted: false,
                parentId: "8xf0y6ziyjabvozdd253nd",
                timestamp: 1468166872634,
                votes:[],
                deleted: false,
                
            }

        fetch.mockReject(JSON.stringify({error}));
        

        const expectedActions = [
            {type: SharedType.LOADING,loading:true},
            {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
        ];

        return store.dispatch(Creators.delete(comment.id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))
        
    });
   


})