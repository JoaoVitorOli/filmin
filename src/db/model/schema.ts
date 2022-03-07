import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'user_info',
      columns: [
        { name: 'name', type: 'string', isOptional: true },
        { name: 'photo', type: 'string', isOptional: true },
      ]
    }),
  ]
})