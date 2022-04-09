import { 
  createTable, 
  schemaMigrations, 
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: 'movies',
          columns: [
            { name: 'status', type: 'boolean' },
          ],
        }),
      ],
    },
  ],
})