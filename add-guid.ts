import * as uuid from 'uuid/v4'

const addGuid = (req, res, next) => {
  if (req.method === 'POST') {
    req.body.uuid = uuid()
  }
  next()
}

export = addGuid
