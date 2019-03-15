/// <reference types="cypress" />
import { merge } from 'ramda'
import uuid from 'uuid/v4'
import { api } from '../../dist/schemas'

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
    cy.request({
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
      cy.request({
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

  it('has todo fixture matching schema', () => {
    cy.fixture('todo').then(api.assertSchema('PostTodoRequest', '1.0.0'))
  })

  it('returns new TODO item matching schema', () => {
    cy.fixture('todo').then(todo => {
      cy.request({
        method: 'POST',
        url: todosUrl,
        body: todo
      })
        .its('body')
        .then(api.assertSchema('PostTodoResponse', '1.0.0'))
    })
  })

  it('can pass asserted todo', () => {
    const nameIt = name => value => ({ [name]: value })
    cy.fixture('todo')
      .then(api.assertSchema('PostTodoRequest', '1.0.0')) // validates fixture data
      .then(nameIt('body')) // transforms fixture 'data' into {body: data}
      .then(
        merge({
          // forms cy.request options object
          // these fields + {body: data}
          method: 'POST',
          url: todosUrl
        })
      )
      .then(cy.request) // calls cy.request(options)
      .its('body') // grabs response.body
      .then(api.assertSchema('PostTodoResponse', '1.0.0')) // validates response schema
  })
})
