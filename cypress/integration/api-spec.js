/// <reference types="cypress" />
import uuid from 'uuid/v4'

describe('Todo API', () => {
  const todosUrl = '/todos'

  beforeEach(function resetState () {
    const resetUrl = '/reset'
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

  it('adds TODO from fixture', () => {
    cy.fixture('todo').then(todo => {
      cy
        .request({
          method: 'POST',
          url: todosUrl,
          body: todo
        })
        .its('headers')
        .should('include', {
          'x-schema-name': 'PostTodoResponse',
          'x-schema-version': '1.0.0'
        })
    })
  })
})
