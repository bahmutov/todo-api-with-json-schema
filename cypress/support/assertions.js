/// <reference types="cypress" />
import { api } from '../../dist/schemas'

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
