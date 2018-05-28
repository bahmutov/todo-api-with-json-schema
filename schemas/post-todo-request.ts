import { ObjectSchema, versionSchemas } from '@cypress/schema-tools'
import { formats } from '../formats'

type uuid = string

/**
 * Todo item sent by the client.
 */
type PostTodoRequestExample100 = {
  text: string
  done: boolean
  uuid: uuid
}

const postTodoExample100: PostTodoRequestExample100 = {
  text: 'do something',
  done: false,
  uuid: '20514af9-2a2a-4712-9c1e-0510c288c9ec',
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
  example: postTodoExample100,
}

export const PostTodoRequest = versionSchemas(PostTodoRequest100)
