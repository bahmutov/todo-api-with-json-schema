/// <reference types="cypress" />

/**
 * Semver string, usually simple like "major.minor.patch"
 * @example
 * const version: semverString = '2.1.0'
*/
type semverString = string

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Load a fixture JSON and check it against a schema.
     *
     * @example
     * cy.fixtureSchema('single-todo', 'Todo', '1.1.0')
     */
    fixtureSchema(fixturePath: string, schemaName: string, schemaVersion: semverString): Chainable<any>
  }

  interface Chainer<Subject> {
    /**
     * Custom Chai assertion that checks if the given subject follows
     * a schema
     *
     * @example
    ```
    cy.wrap({ ... })
      .should('followSchema', 'mySchemaName', '2.1.0')
    cy.fixture('filename')
      .should('followSchema', 'PostTodoRequest', '1.0.0')
    cy.wait('@networkCallAlias')
      .its('response.body')
      .should('followSchema', 'PostTodoResponse', '1.0.0')
    ```
    * */
    (chainer: 'followSchema',
      schemaName: string, schemaVersion: string): Chainable<Subject>
  }
}
