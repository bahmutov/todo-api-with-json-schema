/// <reference types="cypress" />
import { api } from '../../dist/schemas'

it('has todo fixture matching schema', () => {
  cy.fixture('todo').then(api.assertSchema('PostTodoRequest', '1.0.0'))
})
