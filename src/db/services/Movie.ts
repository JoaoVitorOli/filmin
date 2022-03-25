import { database } from "../index.native";
import Movie from "../model/Movie";

export async function addNewMovie() {
  try {
    await database.write(async () => {
      await database.get<Movie>("movies").create(movie => {
        movie.name = "teste",
        movie.date = "2020",
        movie.averange = 5,
        movie.isChecked = true,
        movie.posterPath = "https://teste.com"
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

    const data = [];

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