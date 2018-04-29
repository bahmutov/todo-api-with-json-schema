const schemaCheck = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/todos') {
    console.log('posting new TODO item')
    console.log(req.body)
  }
  next()
}

export = schemaCheck
