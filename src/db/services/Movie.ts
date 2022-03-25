import { database } from "../index.native";
import Movie from "../model/Movie";

type MovieProps = {
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

    const entries = await moviesCollection.query().fetch();

    entries.map(movie => {
      console.log(movie._raw);
    });

    // await database.write(async () => {
    //   await database.unsafeResetDatabase();
    // })
  } catch (error) {
    console.log(error);
  }
}