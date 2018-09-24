import { Home, AddPost, Post } from "../views/components";

const routes = [
    {
        path: "/",
        component: Home,
        exact: true,
    },
    {
        path: "/post",
        component: Post,
        exact: true,
    },
    {
        path: "/post/add",
        component: AddPost,
        exact: true,
    },
];

export default routes;