/// <reference types="cypress" />
import { api } from '../../dist/schemas'

describe('TodoMVC app', () => {
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

  it('returns new item matching schema', () => {
    cy.server()
    cy.route('POST', '/todos').as('post')
    cy.visit('/')
    cy.get('.new-todo').type('Use schemas{enter}')
    cy.wait('@post')
      .its('response.body')
      .then(api.assertSchema('PostTodoResponse', '1.0.0'))
  })
})
