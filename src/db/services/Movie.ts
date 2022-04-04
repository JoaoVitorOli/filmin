import { database } from "../index.native";
import Movie from "../model/Movie";
import User from "../model/User";

type MovieProps = {
  id?: string | number;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  isChecked: boolean;
}

export async function addNewMovie({
  averange, 
  date, 
  isChecked, 
  name, 
  posterPath
}: MovieProps) {
  try {
    await database.write(async () => {
      await database.get<Movie>("movies").create(movie => {
        movie.name = name,
        movie.date = date,
        movie.averange = averange,
        movie.isChecked = isChecked,
        movie.posterPath = posterPath
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllMovies() {
  try {
    const moviesCollection = database.get<Movie>("movies");

    let data: MovieProps[] = [];

    const entries = await moviesCollection.query().fetch();

    if (entries.length > 0) {
      data = entries.map(entrie => {
        return {
          id: entrie.id,
          name: entrie.name!,
          posterPath: entrie.posterPath!,
          averange: entrie.averange!,
          date: entrie.date!,
          isChecked: entrie.isChecked!
        }
      });
    }
    
    return data;

    // await database.write(async () => {
    //   await database.unsafeResetDatabase();
    // })
  } catch (error) {
    console.log(error);
  }
}

export async function saveMovieToDatabase(movie: MovieProps) {
  try {
    await database.write(async () => {
      await database.get<Movie>('user_info').create(user => {
        user.name = movie.name,
        user.date = movie.date,
        user.averange = movie.averange,
        user.isChecked = movie.isChecked,
        user.posterPath = movie.posterPath
      });
    });
  } catch (error) {
    console.log(error);
  }
}
