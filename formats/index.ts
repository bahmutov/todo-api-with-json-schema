import { CustomFormat, CustomFormats } from '@cypress/schema-tools'

const uuid: CustomFormat = {
  name: 'uuid',
  description: 'GUID used through the system',
  detect: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  defaultValue: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
}

export const formats: CustomFormats = {
  uuid,
}
