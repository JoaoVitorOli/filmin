import { database } from "../index.native";
import Movie from "../model/Movie";

type MovieProps = {
  id?: string | number;
  name: string;
  posterPath: string;
  movieAverange: string | number;
  movieDate: string;
  movieStatus: string;
}

export async function addNewMovie({
  movieAverange, 
  movieDate, 
  movieStatus, 
  name, 
  posterPath
}: MovieProps) {
  try {
    await database.write(async () => {
      await database.get<Movie>("movies").create(movie => {
        movie.name = name,
        movie.movieDate = movieDate,
        movie.movieAverange = String(movieAverange),
        movie.movieStatus = movieStatus,
        movie.posterPath = posterPath
      });
    });

    // await database.write(async () => {
    //   await database.unsafeResetDatabase();
    // })
  } catch (error) {
    console.error(error);
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
          movieAverange: entrie.movieAverange!,
          movieDate: entrie.movieDate!,
          movieStatus: entrie.movieStatus!
        }
      });
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function toggleCheckMovie(movieId: string, toggle: string) {
  const userCollection = database.get<Movie>('movies');

  try {
    await database.write(async () => {
      const movie = await userCollection.find(movieId);

      movie.update((item) => {
        item.movieStatus = toggle;
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function handleDeleteTask(movieId: string) {
  try {
    await database.write(async () => {
      const movie = await database.get('movies').find(movieId);
      await movie.destroyPermanently();
    });
  } catch (error) {
    console.error(error);
  }
}
