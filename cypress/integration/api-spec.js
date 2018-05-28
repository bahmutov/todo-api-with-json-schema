/// <reference types="cypress" />
import uuid from 'uuid/v4'

describe('Todo API', () => {
  const baseUrl = 'http://localhost:3000'
  const todosUrl = `${baseUrl}/todos`

  beforeEach(function resetState () {
    const resetUrl = `${baseUrl}/reset`
    cy.request({
      method: 'POST',
      url: resetUrl,
      body: {
        todos: []
      }
    })
  })

  it('adds TODO', () => {
    const todo = {
      text: 'use Cypress',
      done: true,
      uuid: uuid()
    }
    cy
      .request({
        method: 'POST',
        url: todosUrl,
        body: todo
      })
      .its('body')
      .should(
        'be.deep.equal',
        // es8 ... spread operator not transpiled
        // by Cypress without extra configuration
        // so just use "Object.assign" to merge extra property
        Object.assign({}, todo, {
          id: 1
        })
      )
  })
})
