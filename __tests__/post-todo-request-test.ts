import { assertSchema, bind } from '@cypress/schema-tools'
import { schemas } from '../schemas'

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
})
