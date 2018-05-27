// generates schema documentation
import { documentSchemas } from '@cypress/schema-tools'
import { schemas } from './schemas'
console.log(documentSchemas(schemas))
