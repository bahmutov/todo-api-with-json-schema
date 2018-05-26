import { api } from './schemas'

const assertTodoRequest = api.assertSchema('PostTodoRequest', '1.0.0')

const schemaCheck = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/todos') {
    console.log('posting new TODO item')
    console.log(req.body)
    try {
      assertTodoRequest(req.body)
    } catch (e) {
      console.error('new Todo request did not pass schema')
      console.error(e.message)
      return next(e)
    }
  }
  next()
}

export = schemaCheck
