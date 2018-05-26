import { ObjectSchema, versionSchemas } from '@cypress/schema-tools'

/**
 * Todo item saved by the server and returned to the client.
 */
type PostTodoResponseExample100 = {
  text: string
  done: boolean
  id: number
}

const postTodoResponseExample100: PostTodoResponseExample100 = {
  text: 'do something',
  done: false,
  id: 2,
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
    },
    // require all properties
    required: true,
    // do not allow any extra properties
    additionalProperties: false,
  },
  example: postTodoResponseExample100,
}

export const PostTodoResponse = versionSchemas(PostTodoResponse100)
