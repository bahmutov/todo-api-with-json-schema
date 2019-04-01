/// <reference types="cypress" />
import { map, forEach } from 'ramda'
import { api } from '../../dist/schemas'

describe('TodoMVC app', () => {
  // a couple of reusable functions, schema-tools methods are curried
  // so to check a data item execute assertTodo(item)
  const assertTodo = api.assertSchema('PostTodoResponse', '1.0.0')

  /**
   * Passes list of items through `assertTodo`
   *
   * @example
   ```
  cy.wait('@loading')
    .its('response.body')
    .should(assertTodos)
   ```
   */
  const assertTodos = forEach(assertTodo)

  /**
   * Removes dynamic properties from "PostTodoResponse@1.0.0" object.
   */
  const sanitizeTodo = api.sanitize('PostTodoResponse', '1.0.0')

  /**
   * Shortcut to sanitize list of items. Same as `list => list.map(sanitizeTodo)`
   * @example
   *  sanitizeTodos(list)
   */
  const sanitizeTodos = map(sanitizeTodo)

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

  it('sets response headers with schema version', () => {
    cy.server()
    cy.route('POST', '/todos').as('post')
    cy.visit('/')
    cy.get('.new-todo').type('Use schemas{enter}')

    cy.wait('@post')
      // check response has headers with schema name and version
      .its('response.headers')
      .should(headers => {
        expect(headers).to.have.property('x-schema-name', 'PostTodoResponse')
        expect(headers).to.have.property('x-schema-version', '1.0.0')
      })
  })

  it('returns new item matching schema (assert)', () => {
    cy.server()
    cy.route('POST', '/todos').as('post')
    cy.visit('/')
    cy.get('.new-todo').type('Use schemas{enter}')

    // check response passes schema
    cy.wait('@post')
      .its('response.body')
      .should(assertTodo)
  })

  it('returns new item matching schema', () => {
    cy.server()
    cy.route('POST', '/todos').as('post')
    cy.visit('/')
    cy.get('.new-todo').type('Use schemas{enter}')

    // check response passes schema
    cy.wait('@post')
      .its('response.body')
      .should('followSchema', 'PostTodoResponse', '1.0.0')
  })

  it('returns the list of Todos matching schema', () => {
    cy.visit('/')
    cy.get('.new-todo')
      .type('first{enter}')
      .type('second{enter}')
    // start spying on the XHR to catch loading todos
    cy.server()
    cy.route('GET', '/todos').as('loading')
    cy.reload()
    cy.wait('@loading')
      .its('response.body')
      .should(assertTodos)
      // then we can sanitize each item to remove dynamic UUID
      .then(sanitizeTodos)
      // and now we can use deep equality to confirm data
      .should('deep.equal', [
        {
          id: 1,
          text: 'first',
          done: false,
          uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff'
        },
        {
          id: 2,
          text: 'second',
          done: false,
          uuid: 'ffffffff-ffff-ffff-ffff-ffffffffffff'
        }
      ])
  })
})
