import { SchemaCollection, bind, combineSchemas } from '@cypress/schema-tools'
import { formats } from '../formats'
import { PostTodoRequest } from './post-todo-request'
import { PostTodoResponse } from './post-todo-response'

export const schemas: SchemaCollection = combineSchemas(
  PostTodoRequest,
  PostTodoResponse
)

export const api = bind({ schemas, formats: formats })
/*
  api has methods to validate, sanitize, etc. objects against "schemas"
  {
    assertSchema: [Function],
    schemaNames: [ 'postTodoRequest' ],
    getExample: [Function],
    sanitize: [Function],
    validate: [Function]
  }
*/
