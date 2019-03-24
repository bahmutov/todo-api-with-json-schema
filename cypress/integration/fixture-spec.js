/// <reference types="cypress" />
import { api } from '../../dist/schemas'

it('has todo fixture matching schema', () => {
  cy.fixture('todo').then(api.assertSchema('PostTodoRequest', '1.0.0'))
})

Cypress.Commands.add(
  'fixtureSchema',
  (fixtureName, schemaName, schemaVersion) => {
    expect(fixtureName, 'fixture name').to.be.a('string')
    cy.fixture(fixtureName, { log: false }).then(
      api.assertSchema(schemaName, schemaVersion)
    )
  }
)

it('loads and asserts todo schema', () => {
  cy.fixtureSchema('todo', 'PostTodoRequest', '1.0.0')
    // you can chain commands to the loaded fixture
    .should('have.property', 'text', 'use fixtures')
})

// how to add a custom Chai assertion to Cypress
// see "Adding Chai Assertions" recipe in
// https://github.com/cypress-io/cypress-example-recipes

const isFollowingSchema = (_chai, utils) => {
  function assertFollowingSchema (schemaName, schemaVersion) {
    // if the subject does not the schema, we will
    // get a very nice error message from "api.assertSchema"
    api.assertSchema(schemaName, schemaVersion)(this._obj)

    // but if assertion passes, we should print passing assertion
    // message which we can do using Chai
    this.assert(
      true,
      `expected subject to follow schema **${schemaName}@${schemaVersion}**`
    )
  }

  _chai.Assertion.addMethod('followSchema', assertFollowingSchema)
}
chai.use(isFollowingSchema)

it('asserts schema using custom Chai assertion', () => {
  cy.wrap(
    {
      text: 'my item',
      done: false,
      uuid: 'bb3424c6-ab3a-4b38-b6c3-6495d2035dd4'
    },
    { log: false, timeout: 100 }
  ).should('followSchema', 'PostTodoRequest', '1.0.0')

  // pass loaded fixture to our custom assertion
  cy.fixture('todo').should('followSchema', 'PostTodoRequest', '1.0.0')
})
