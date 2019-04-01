/// <reference types="cypress" />
import { api } from '../../dist/schemas'

Cypress.Commands.add(
  'fixtureSchema',
  (fixtureName, schemaName, schemaVersion) => {
    // verify input arguments to prevent silly mistakes
    expect(fixtureName, 'fixture name').to.be.a('string')
    expect(schemaName, 'schema name').to.be.a('string')
    expect(schemaVersion, 'schema version').to.match(/^\d+\.\d+\.\d+$/)

    // load and verify the fixture itself
    cy.fixture(fixtureName, { log: false }).then(
      api.assertSchema(schemaName, schemaVersion)
    )
  }
)
