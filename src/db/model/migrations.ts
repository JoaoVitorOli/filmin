import { 
  createTable, 
  schemaMigrations, 
  addColumns,
} from '@nozbe/watermelondb/Schema/migrations'

export default schemaMigrations({
  migrations: [
    {
      toVersion: 4,
      steps: [
        addColumns({
          table: 'movies',
          columns: [
            { name: 'checkStatus', type: 'number' },
          ],
        }),
      ],
    },
  ],
})