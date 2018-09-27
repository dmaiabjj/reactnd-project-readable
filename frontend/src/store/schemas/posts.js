import { schema } from 'normalizr'

const postSchema     = new schema.Entity('posts');
export default new schema.Array(postSchema)