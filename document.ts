// generates schema documentation
import { documentSchemas } from '@cypress/schema-tools'
import { formats } from './formats'
import { schemas } from './schemas'
console.log(documentSchemas(schemas, formats))
