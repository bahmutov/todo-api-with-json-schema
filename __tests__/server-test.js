import * as got from 'got'
import { api } from '../schemas'

describe('server api', () => {
  const baseUrl = 'http://localhost:3000'
  const todosUrl = `${baseUrl}/todos`

  beforeEach(function resetState () {
    const resetUrl = `${baseUrl}/reset`
    return got(resetUrl, {
      method: 'POST',
      json: true,
      body: {
        todos: []
      }
    })
  })

  it('returns empty list of todos', async () => {
    const response = await got(todosUrl, { json: true })
    expect(response.body).toEqual([])
  })

  it('adds example todo', async () => {
    const example = api.getExample('postTodoRequest')('1.0.0')
    const response = await got(todosUrl, {
      method: 'POST',
      json: true,
      body: example
    })
    // HACK to match dynamic uuid
    response.body.uuid = example.uuid
    expect(response.body).toEqual({
      ...example,
      id: 1
    })
    expect(response.headers['x-schema-name']).toBe('PostTodoResponse')
    expect(response.headers['x-schema-version']).toBe('1.0.0')
  })

  it('adds todo', async () => {
    const response = await got(todosUrl, {
      method: 'POST',
      json: true,
      body: {
        text: 'sanitize using schema',
        done: false
      }
    })
    const schemaName = 'PostTodoResponse'
    const schemaVersion = '1.0.0'
    api.assertSchema(schemaName, schemaVersion)(response.body)
    expect(
      api.sanitize(schemaName, schemaVersion)(response.body)
    ).toMatchSnapshot()
  })
})
