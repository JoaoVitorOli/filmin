import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: 'user_info',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'photo', type: 'string' },
      ]
    }),
    tableSchema({
      name: 'movies',
      columns: [
        { name: 'name', type: 'string' },
        { name: 'posterPath', type: 'string' },
        { name: 'averange', type: 'number' },
        { name: 'date', type: 'number' },
        { name: 'isChecked', type: 'boolean' },
      ]
    }),
  ]
})