import { ObjectSchema, versionSchemas } from '@cypress/schema-tools'
import { formats } from '../formats'

type uuid = string

/**
 * Todo item saved by the server and returned to the client.
 */
type PostTodoResponseExample100 = {
  text: string
  done: boolean
  id: number
  uuid: uuid
}

const postTodoResponseExample100: PostTodoResponseExample100 = {
  text: 'do something',
  done: false,
  id: 2,
  uuid: '3372137d-b582-4e32-807d-af3021112efa',
}

const PostTodoResponse100: ObjectSchema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    title: 'PostTodoResponse',
    type: 'object',
    description: 'Todo item saved by the server and returned to the client',
    properties: {
      text: {
        type: 'string',
        description: 'Todo text, like "clean room"',
      },
      done: {
        type: 'boolean',
        description: 'Is this todo item completed?',
      },
      id: {
        type: 'integer',
        minimum: 1,
        description: 'Item server id',
      },
      uuid: {
        type: 'string',
        format: formats.uuid.name, // "uuid"
        description: 'item random GUID',
      },
    },
    // require all properties
    required: true,
    // do not allow any extra properties
    additionalProperties: false,
  },
  example: postTodoResponseExample100,
}

export const PostTodoResponse = versionSchemas(PostTodoResponse100)
