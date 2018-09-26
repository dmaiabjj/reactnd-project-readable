import {combineReducers} from "redux"

import categories from "./category"
import user from "./user"
import posts from "./post"
import comments from "./comment"

export default combineReducers({
    categories,
    user,
    posts,
    comments
})