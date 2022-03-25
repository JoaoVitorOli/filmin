import { createTable, schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: 'movies',
          columns: [
            { name: 'name', type: 'string' },
            { name: 'posterPath', type: 'string' },
            { name: 'averange', type: 'number' },
            { name: 'date', type: 'number' },
            { name: 'isChecked', type: 'boolean' },
          ],
        }),
      ],
    },
  ],
})