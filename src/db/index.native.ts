import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from './model/schema'
import migrations from './model/migrations'
import User from './model/User'
import Movie from './model/Movie'

const adapter = new SQLiteAdapter({
  schema,
  migrations,
  onSetUpError: error => {
    console.log("on set up error");
    console.log(error);
  }
})

// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [
    User,
    Movie
  ],
})