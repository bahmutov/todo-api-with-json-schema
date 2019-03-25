// @ts-check
/// <reference path="../support/index.d.ts" />

import { api } from '../../dist/schemas'

it('has todo fixture matching schema', () => {
  cy.fixture('todo').then(api.assertSchema('PostTodoRequest', '1.0.0'))
})

it('loads and asserts todo schema', () => {
  // uses a custom command we have added in cypress/support/commands.js
  cy.fixtureSchema('todo', 'PostTodoRequest', '1.0.0')
    // you can chain commands to the loaded fixture
    .should('have.property', 'text', 'use fixtures')
})

it('asserts schema using custom Chai assertion', () => {
  // uses a custom assertion we have added in cypress/support/assertions.js

  // you can wrap any object and use the new custom assertion
  // cy.wrap({ ... })
  //   .should('followSchema', schemaName, schemaVersion)
  cy.wrap(
    {
      text: 'my item',
      done: false,
      uuid: 'bb3424c6-ab3a-4b38-b6c3-6495d2035dd4'
    },
    { log: false, timeout: 100 }
  ).should('followSchema', 'PostTodoRequest', '1.0.0')

  // or pass any subject, like a loaded fixture
  cy.fixture('todo').should('followSchema', 'PostTodoRequest', '1.0.0')
})
