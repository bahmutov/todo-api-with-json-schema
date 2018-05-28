import { assertSchema, bind } from '@cypress/schema-tools'
import { formats } from '../formats'
import { api, schemas } from '../schemas'

describe('POST /todo request', () => {
  const assertTodoRequest = assertSchema(schemas)('postTodoRequest', '1.0.0')

  it('valid TODO request object', () => {
    const todo = {
      text: 'use scheams',
      done: true,
      uuid: '4899e1a9-e38f-43f9-a765-35b81a41c65d',
    }
    expect(() => {
      assertTodoRequest(todo)
    }).not.toThrow()
  })

  it('TODO request object missing text', () => {
    const todo = {
      done: true,
      uuid: '4899e1a9-e38f-43f9-a765-35b81a41c65d',
    }
    expect(() => {
      assertTodoRequest(todo)
    }).toThrowErrorMatchingSnapshot()
  })

  it('bind schemas', () => {
    const api = bind({ schemas })
    const todoRequestExample = api.getExample('postTodoRequest')('1.0.0')
    expect(todoRequestExample).toEqual({
      text: 'do something',
      done: false,
      uuid: '20514af9-2a2a-4712-9c1e-0510c288c9ec',
    })
  })

  it('bind schemas and assert an object', () => {
    const api = bind({ schemas })
    const schemaName = 'postTodoRequest'
    const schemaVersion = '1.0.0'
    const example = api.getExample(schemaName)(schemaVersion)
    const assertRequest = api.assertSchema(schemaName, schemaVersion)
    expect(() => {
      assertRequest(example)
    }).not.toThrow()
  })

  it('sanitizes example object', () => {
    const todo = {
      text: 'my text',
      done: false,
      uuid: '13d46b9e-932f-4265-a4aa-1ee80e2c88d6',
    }
    const sanitized = api.sanitize('postTodoRequest', '1.0.0')(todo)
    expect(sanitized).toEqual({
      text: 'my text',
      done: false,
      // default value should be "ffffffff-ffff-ffff-ffff-ffffffffffff"
      uuid: formats.uuid.defaultValue,
    })
  })
})
