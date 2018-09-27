
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
        .then(res => res.json())
        .then(data => data.posts)

export const getAllPosts = () =>
    fetch(`${api}/posts/`, { headers })
        .then(res => res.json())
        .then(data => data.posts)


export const addPost = (post) =>
    fetch(`${api}/posts`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ post })
    })
        .then(res => res.json())
        .then(data => data.post)

export const getPostById = (id) =>
    fetch(`${api}/posts/${id}`, { headers })
        .then(res => res.json())
        .then(data => data.post)

export const upOrDownPostVote = (id,option) =>
    fetch(`${api}/posts/${id}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    })
        .then(res => res.json())
        .then(data => data.post)

export const updatePost = (id,title,body) =>
    fetch(`${api}/posts/${id}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title , body })
    })
        .then(res => res.json())
        .then(data => data.post)

export const deletePost = (id) =>
    fetch(`${api}/posts/${id}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        },
    })
        .then(res => res.json())
        .then(data => data.comment)

export const getCommentsByPostId = (id) =>
    fetch(`${api}/posts/${id}/comments`, { headers })
        .then(res => res.json())
        .then(data => data.comments)

export const addCommentPost = (comment) =>
    fetch(`${api}/comment`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment })
    })
        .then(res => res.json())
        .then(data => data.comment)

export const getCommentById = (id) =>
    fetch(`${api}/comments/${id}`, { headers })
        .then(res => res.json())
        .then(data => data.comment)

export const upOrDownCommentVote = (id,option) =>
    fetch(`${api}/comments/${id}`, {
        method: 'POST',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ option })
    })
        .then(res => res.json())
        .then(data => data.comment)

export const updateComment = (id,timestamp,body) =>
    fetch(`${api}/comments/${id}`, {
        method: 'PUT',
        headers: {
        ...headers,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timestamp , body })
    })
        .then(res => res.json())
        .then(data => data.comment)
        
export const deleteComment = (id) =>
    fetch(`${api}/comments/${id}`, {
        method: 'DELETE',
        headers: {
        ...headers,
        },
    })
        .then(res => res.json())
        .then(data => data.comment)