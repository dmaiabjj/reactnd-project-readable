import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import _ from 'lodash'

import posts                                                        from '../../mocks/posts'
import {Types as PostType,Creators,getPostByFilter,getPostById}     from '../../../store/features/post'
import {Types as CommentType}                                       from '../../../store/features/comment'
import {Types as SharedType}                                        from '../../../store/features/shared'
import reducer                                                      from '../../../store/features/post'

const INITIAL_STATE = {};

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    posts : INITIAL_STATE
});


describe('Post', () => {

    beforeEach(() => {
        store.clearActions();
    })

    /*  REDUCERS  */

    it('[Reducer] should handle initial state', () => {
            expect(reducer(undefined,{}))
                .toEqual({});
    });

    it('[Reducer] should handle FETCH_SUCCESS action', () => {
        expect(reducer({},{type:PostType.FETCH_SUCCESS,posts}))
        .toEqual(posts);
    });

    it('[Reducer] should handle COMMENT/ADD_SUCCESS action', () => {

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

        const expected =  {
            ...posts,
            [comment.parentId] :{
                ...posts[comment.parentId],...{commentCount:posts[comment.parentId].commentCount + 1}
            }
        }

        expect(reducer(posts,{type:CommentType.ADD_SUCCESS,comment}))
        .toEqual(expected);
    });

    it('[Reducer] should handle COMMENT/DELETE_SUCCESS action', () => {

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

        const expected =  {
            ...posts,
            [comment.parentId] :{
                ...posts[comment.parentId],...{commentCount:posts[comment.parentId].commentCount - 1}
            }
        }


        expect(reducer(posts,{type:CommentType.DELETE_SUCCESS,comment}))
        .toEqual(expected);
    });

    it('[Reducer] should handle FETCH_SUCCESS action', () => {

        expect(reducer({},{type:PostType.FETCH_SUCCESS,posts}))
        .toEqual(posts);
    });


    it('[Reducer] should handle REACT_SUCCESS action', () => {

        const id        = "8xf0y6ziyjabvozdd253nd"
        const reactions = [{name : "diego",option : "zombie"}];

        const expected = {
            ...posts,
            [id] : {
                ...posts[id],...{reactions : [...reactions]}
            }
        }

        expect(reducer(posts,{type:PostType.REACT_SUCCESS,id,reactions}))
        .toEqual(expected);
    });

    it('[Reducer] should handle VOTE_SUCCESS action', () => {

        const id    = "8xf0y6ziyjabvozdd253nd"
        const votes = [{name : "diego",option : "upVote",value: 1}];

        const expected = {
            ...posts,
            [id] : {
                ...posts[id],...{votes : [...votes]}
            }
        }

        expect(reducer(posts,{type:PostType.VOTE_SUCCESS,id,votes}))
        .toEqual(expected);
    });

    it('[Reducer] should handle DELETE_SUCCESS action', () => {

        const id        = "8xf0y6ziyjabvozdd253nd"
        const expected  = _.omit(posts, id);

        expect(reducer(posts,{type:PostType.DELETE_SUCCESS,id}))
        .toEqual(expected);
    });


    /*  REDUCERS  */

    /*  ACTION CREATORS  */

    it('[Action Creator FETCH] should dispatch a LOADING -> FETCH_SUCCESS  action ',
        () => {

            fetch.mockResponse(JSON.stringify(posts));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: PostType.FETCH_SUCCESS,posts}
            ];

            return store.dispatch(Creators.fetch())
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });


    it('[Action Creator FETCH] should dispatch a FETCH_SUCCESS action ',
        () => {
            expect(Creators.fetchSuccess(posts))
                .toEqual({posts,type: PostType.FETCH_SUCCESS});
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

    it('[Action Creator FETCH_BY_ID] should dispatch a LOADING -> FETCH_SUCCESS  action ',
        () => {

            const id    = '6ni6ok3ym7mf1p33lnez'
            const post  = {"6ni6ok3ym7mf1p33lnez": {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1535760601,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
								votes:[{name: 'carlos',option: 'upVote',value : 1}],
                reactions:[],
                deleted: false,
                commentCount: 0
              }
            }


            fetch.mockResponse(JSON.stringify(posts[id]));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: PostType.FETCH_SUCCESS,posts : post}
            ];

            return store.dispatch(Creators.fetchById(id))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });


    it('[Action Creator FETCH_BY_ID] should fetch dispatch a LOADING -> ACTION_FAILURE  action ',
        () => {
            const expected = JSON.stringify({error});
            fetch.mockReject(expected);

            const id    = '8xf0y6ziyjabvozdd253nd'

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : expected}
            ];

           return store.dispatch(Creators.fetchById(id))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

    it('[Action Creator VOTE] should dispatch a LOADING -> VOTE_SUCCESS  action ',
        () => {

            const id    = "894tuq4ut84ut8v4t8wun89g"
            const votes = [{name : "diego",option : "upVote",value: 1}];

            fetch.mockResponse(JSON.stringify({id,votes}));


            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {id,votes,type: PostType.VOTE_SUCCESS}
            ];

            return store.dispatch(Creators.vote(id,votes[0].name,votes[0].option))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

    it('[Action Creator VOTE] should dispatch a VOTE_SUCCESS action ',
        () => {

            const id    = "894tuq4ut84ut8v4t8wun89g"
            const votes = [{name : "diego",option : "upVote",value: 1}];

            expect(Creators.voteSuccess(id,votes))
                .toEqual({id,votes,type: PostType.VOTE_SUCCESS});
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


    it('[Action Creator REACT] should dispatch a LOADING -> REACT_SUCCESS  action ',
        () => {

            const id        = "894tuq4ut84ut8v4t8wun89g"
            const reactions = [{name : "diego",option : "zombie"}];

            fetch.mockResponse(JSON.stringify({id,reactions}));


            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {id,reactions,type: PostType.REACT_SUCCESS}
            ];

            return store.dispatch(Creators.react(id,reactions[0].name,reactions[0].option))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

    it('[Action Creator REACT] should dispatch a REACT_SUCCESS action ',
        () => {

            const id        = "894tuq4ut84ut8v4t8wun89g"
            const reactions = [{name : "diego",option : "zombie"}];

            expect(Creators.reactSuccess(id,reactions))
                .toEqual({id,reactions,type: PostType.REACT_SUCCESS});
    });


    it('[Action Creator REACT] should dispatch a LOADING -> ACTION_FAILURE  action ',
        () => {

            const id        = "894tuq4ut84ut8v4t8wun89g"
            const reactions = [{name : "diego",option : "zombie"}];

            fetch.mockReject(JSON.stringify({error}));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
            ];

            return store.dispatch(Creators.react(id,reactions[0].name,reactions[0].option))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });


    it('[Action Creator ADD] should dispatch a LOADING -> ADD_SUCCESS  action ',
        () => {
            const post =
            {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1535760601,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                votes:[],
                reactions:[{name: 'thingtwo',option: 'gostei'},{name: 'carlos',option: 'amei'}],
                deleted: false,
                commentCount: 0
            }

            const expected = {
                ...posts,
                [post.id] : post
            }

            fetch.mockResponse(JSON.stringify(expected));


            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: PostType.ADD_SUCCESS,post : expected }
            ];

            return store.dispatch(Creators.add(post))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });


    it('[Action Creator ADD] should dispatch a ADD_SUCCESS action ',
        () => {

            const post =
            {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1535760601,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                votes:[],
                reactions:[{name: 'thingtwo',option: 'gostei'},{name: 'carlos',option: 'amei'}],
                deleted: false,
                commentCount: 0
            }


            expect(Creators.addSuccess(post))
                .toEqual({post,type: PostType.ADD_SUCCESS});
    });

    it('[Action Creator ADD] should dispatch a LOADING -> ACTION_FAILURE  action ',
        () => {

            const post =
            {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1535760601,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                votes:[],
                reactions:[{name: 'thingtwo',option: 'gostei'},{name: 'carlos',option: 'amei'}],
                deleted: false,
                commentCount: 0
            }

            fetch.mockReject(JSON.stringify({error}));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
            ];

            return store.dispatch(Creators.add(post))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

    it('[Action Creator UPDATE] should dispatch a LOADING -> UPDATE_SUCCESS  action ',
        () => {
            const post =
            {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1535760601,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                votes:[],
                reactions:[{name: 'thingtwo',option: 'gostei'},{name: 'carlos',option: 'amei'}],
                deleted: false,
                commentCount: 0
            }


            fetch.mockResponse(JSON.stringify({post}));


            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: PostType.UPDATE_SUCCESS,post}
            ];

            return store.dispatch(Creators.update(post))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

    it('[Action Creator UPDATE] should dispatch a UPDATE_SUCCESS action ',
        () => {

            const post =
            {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1535760601,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                votes:[],
                reactions:[{name: 'thingtwo',option: 'gostei'},{name: 'carlos',option: 'amei'}],
                deleted: false,
                commentCount: 0
            }

            expect(Creators.updateSuccess(post))
                .toEqual({post,type: PostType.UPDATE_SUCCESS});
    });

    it('[Action Creator UPDATE] should dispatch a LOADING -> ACTION_FAILURE  action ',
        () => {

            const post =
            {
                id: '6ni6ok3ym7mf1p33lnez',
                timestamp: 1535760601,
                title: 'Learn Redux in 10 minutes!',
                body: 'Just kidding. It takes more than 10 minutes to learn technology.',
                author: 'thingone',
                category: 'redux',
                votes:[],
                reactions:[{name: 'thingtwo',option: 'gostei'},{name: 'carlos',option: 'amei'}],
                deleted: false,
                commentCount: 0
            }

            fetch.mockReject(JSON.stringify({error}));

            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
            ];

            return store.dispatch(Creators.update(post))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

    it('[Action Creator DELETE] should dispatch a LOADING -> DELETE_SUCCESS  action ',
        () => {

            const id = '6ni6ok3ym7mf1p33lnez'

            fetch.mockResponse(JSON.stringify({id}));


            const expectedActions = [
                {type: SharedType.LOADING,loading:true},
                {id,type: PostType.DELETE_SUCCESS}
            ];

            return store.dispatch(Creators.delete(id))
                .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

    it('[Action Creator DELETE] should dispatch a DELETE_SUCCESS action ',
        () => {

            const id = '6ni6ok3ym7mf1p33lnez'
            expect(Creators.deleteSuccess(id))
                .toEqual({id,type: PostType.DELETE_SUCCESS});
    });

    it('[Action Creator DELETE] should dispatch a LOADING -> ACTION_FAILURE  action ',
    () => {

        const id = '6ni6ok3ym7mf1p33lnez'

        fetch.mockReject(JSON.stringify({error}));


        const expectedActions = [
            {type: SharedType.LOADING,loading:true},
            {type: SharedType.ACTION_FAILURE,error : JSON.stringify({error})}
        ];

        return store.dispatch(Creators.delete(id))
            .then(() => expect(store.getActions()).toEqual(expectedActions))

    });

     /*  ACTION CREATORS  */

    /*  SELECTORS  */

    it('[SELECTORS] should handle getPostById', () => {

        const id        = "8xf0y6ziyjabvozdd253nd"
        const expected  = posts[id]

        expect(getPostById(id)({posts}))
        .toEqual(expected);
    });


    it('[SELECTORS] should handle getPostById by react category', () => {

        const id        = '8xf0y6ziyjabvozdd253nd'
        const category  = 'react'
        const filter    = 'timestamp'
        const order     = 'asc'

        const expected  = [posts[id]]

        expect(getPostByFilter(category,filter,order)({posts}))
        .toEqual(expected);
    });


    it('[SELECTORS] should handle getPostById by redux category', () => {

        const id        = '6ni6ok3ym7mf1p33lnez'
        const category  = 'redux'
        const filter    = 'timestamp'
        const order     = 'asc'

        const expected  = [posts[id]]

        expect(getPostByFilter(category,filter,order)({posts}))
        .toEqual(expected);
    });

    it('[SELECTORS] should handle getPostById by votes', () => {

        const category  = 'all'
        const filter    = 'votes'
        const order     = 'desc'

        const expected  = _.orderBy(Object.keys(posts)
                            .map(id => posts[id])
                            .filter(post => category === 'all' || post.category === category),[filter],[order])

        expect(getPostByFilter(category,filter,order)({posts}))
        .toEqual(expected);
    });


    /*  SELECTORS  */

})
