import * as got from 'got'
import { api } from '../schemas'

const baseUrl = 'http://localhost:3000'
const todosUrl = `${baseUrl}/todos`

beforeEach(function resetState() {
  const resetUrl = `${baseUrl}/reset`
  return got(resetUrl, {
    method: 'POST',
    json: true,
    body: {
      todos: [],
    },
  })
})

test('returns empty list of todos', async () => {
  const response = await got(todosUrl, { json: true })
  expect(response.body).toEqual([])
})

test('adds example todo', async () => {
  const example = api.getExample('postTodoRequest')('1.0.0')
  const response = await got(todosUrl, {
    method: 'POST',
    json: true,
    body: example,
  })
  expect(response.body).toEqual({
    ...example,
    id: 1,
  })
  expect(response.headers['x-schema-name']).toBe('PostTodoResponse')
  expect(response.headers['x-schema-version']).toBe('1.0.0')
})
