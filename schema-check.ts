import { api } from './schemas'

const assertTodoRequest = api.assertSchema('PostTodoRequest', '1.0.0')
const assertTodoResponse = api.assertSchema('PostTodoResponse', '1.0.0')

const schemaNameHeader = 'x-schema-name'
const schemaVersionHeader = 'x-schema-version'

const isSuccessful = res => res.statusCode === 200

const validateJsonResponse = res => {
  const resJson = res.jsonp.bind(res)
  res.jsonp = data => {
    // TODO: only check successful responses
    // otherwise we could be checking JSON error objects
    assertTodoResponse(data)
    res.set(schemaNameHeader, 'PostTodoResponse')
    res.set(schemaVersionHeader, '1.0.0')
    return resJson(data)
  }
}

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

    validateJsonResponse(res)
  }
  next()
}

export = schemaCheck
