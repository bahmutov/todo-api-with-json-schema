import {
  ObjectSchema,
  SchemaCollection,
  bind,
  combineSchemas,
  versionSchemas,
} from '@cypress/schema-tools'

/**
 * Todo item sent by the client.
 */
type PostTodoRequestExample100 = {
  text: string
  done: boolean
}

const postTodoExample100: PostTodoRequestExample100 = {
  text: 'do something',
  done: false,
}

const PostTodoRequest100: ObjectSchema = {
  version: {
    major: 1,
    minor: 0,
    patch: 0,
  },
  schema: {
    title: 'PostTodoRequest',
    type: 'object',
    description: 'Todo item sent by the client',
    properties: {
      text: {
        type: 'string',
        description: 'Todo text, like "clean room"',
      },
      done: {
        type: 'boolean',
        description: 'Is this todo item completed?',
      },
    },
    // require all properties
    required: true,
    // do not allow any extra properties
    additionalProperties: false,
  },
  example: postTodoExample100,
}

const PostTodoRequest = versionSchemas(PostTodoRequest100)

export const schemas: SchemaCollection = combineSchemas(PostTodoRequest)

export const api = bind({ schemas })
