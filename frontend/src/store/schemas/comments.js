import { schema } from "normalizr"

const commentSchema     = new schema.Entity('comments');
export default new schema.Array(commentSchema)