/// <reference types="cypress" />
import { api } from '../../dist/schemas'

Cypress.Commands.add(
  'fixtureSchema',
  (fixtureName, schemaName, schemaVersion) => {
    expect(fixtureName, 'fixture name').to.be.a('string')
    expect(schemaName, 'schema name').to.be.a('string')
    expect(schemaVersion, 'schema version').to.match(/^\d+\.\d+\.\d+$/)

    cy.fixture(fixtureName, { log: false }).then(
      api.assertSchema(schemaName, schemaVersion)
    )
  }
)
