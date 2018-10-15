import { schema } from 'normalizr'

/* Criando o schema das entidades post para serem normalizadas na biblioteca normalizr */
const postSchema     = new schema.Entity('posts');
export default new schema.Array(postSchema);