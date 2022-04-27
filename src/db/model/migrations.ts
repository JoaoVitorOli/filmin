import { 
  createTable, 
  schemaMigrations, 
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 6,
      steps: [
        addColumns({
          table: 'movies',
          columns: [
            { name: 'movieAverange', type: 'string' },
          ],
        }),
      ],
    },
  ],
})