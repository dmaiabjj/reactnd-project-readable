
const api = 'http://localhost:3001'

let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
    fetch(`${api}/categories/`, { headers })
        .then(res => res.json())
        .then(data => data.categories)

export const getPostsByCategory = (category) =>
    fetch(`${api}/${category}/posts`, { headers })
    .then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(data => data.posts)

export const getAllPosts = () =>
    fetch(`${api}/posts/`, { headers })
    .then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(posts => posts)


export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(post)
    }).then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(post => post)

export const getPostByPostId = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())
        .then(post => post)

export const upOrDownPostVote = (id,user,option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option,user })
    }) .then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(post => post)

export const updatePost = (post) =>
    fetch(`${api}/posts/${post.id}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify( post )
    }) .then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(data => data.post)

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        },
    }).then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 3000);
    })) .then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(post => post)

export const getCommentsByPostId = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(comments => comments)

export const addComment = (comment) =>
    fetch(`${api}/comments`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    }).then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(comment => comment)

export const getCommentById = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())
        .then(comment => comment)

export const upOrDownCommentVote = (id,user,option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user,option })
    })
        .then(res => res.json())
        .then(comment => comment)
        

export const updateComment = (id,timestamp,body) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timestamp , body })
    }).then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(comment => comment)
        
export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        },
    }).then(value => new Promise(resolve => {
        setTimeout(() => {
            resolve(value);
        }, 1000);
    }))
        .then(res => res.json())
        .then(comment => comment)


export function getInitialData () {
    return Promise.all([
        getAllCategories(),
        getAllPosts(),
    ]).then(([categories, posts]) => ({
        categories,
        posts,
    }))
    }