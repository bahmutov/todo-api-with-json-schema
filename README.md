# todo-api-with-json-schema

[![CircleCI](https://circleci.com/gh/bahmutov/todo-api-with-json-schema.svg?style=svg)](https://circleci.com/gh/bahmutov/todo-api-with-json-schema) [![renovate-app badge][renovate-badge]][renovate-app]


This is a demo application showing how to use JSON schemas to validate data flowing in the system.

## Information

- See slides for presentation [JSON Schemas](https://slides.com/bahmutov/json-schemas-confoo)
- Read [JSON Schemas are your True Testing Friend](https://www.cypress.io/blog/2018/07/10/json-schemas-are-your-true-testing-friend/)

## Tests

This project declares the following [schemas](schemas.md). Then the schemas are used from the end-to-end tests. Look at the following tests to see how you can use JSON schemas from your tests

- [cypress/integration/fixture-spec.js](cypress/integration/fixture-spec.js) to validate fixture files against a schema
- [cypress/integration/api-spec.js](cypress/integration/api-spec.js) validates REST api calls against response schema
- [cypress/integration/ui-spec.js](cypress/integration/ui-spec.js) drives the web application via DOM UI and validates the Ajax calls from the application to the server using data schema

## Ramda

If you use [Ramda](https://ramdajs.com/docs/) or [lodash/fp](https://github.com/lodash/lodash/wiki/FP-Guide) you can use curried schema tools functions to create terse functions to validate and sanitize lists of objects. See [cypress/integration/ui-spec.js](cypress/integration/ui-spec.js) for examples.

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
