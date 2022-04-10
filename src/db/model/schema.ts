import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 6,
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
        { name: 'movieAverange', type: 'string' },
        { name: 'movieStatus', type: 'string' },
        { name: 'movieDate', type: 'string' },
      ]
    }),
  ]
})