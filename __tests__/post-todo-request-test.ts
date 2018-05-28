import { assertSchema, bind } from '@cypress/schema-tools'
import { schemas } from '../schemas'

describe('POST /todo request', () => {
  const assertTodoRequest = assertSchema(schemas)('postTodoRequest', '1.0.0')

  it('valid TODO request object', () => {
    const todo = {
      text: 'use scheams',
      done: true,
    }
    expect(() => {
      assertTodoRequest(todo)
    }).not.toThrow()
  })

  it('TODO request object missing text', () => {
    const todo = {
      done: true,
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
