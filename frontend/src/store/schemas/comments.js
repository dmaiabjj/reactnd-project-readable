import { schema } from 'normalizr'

/* Criando o schema das entidades comments para serem normalizadas na biblioteca normalizr */
const commentSchema     = new schema.Entity('comments');
export default new schema.Array(commentSchema)