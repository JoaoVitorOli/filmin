import { Q } from "@nozbe/watermelondb";
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

export async function addMovies(movies: MovieProps[]) {
  try {
    await database.write(async () => {
      for (let i = 0; i < movies.length; i++) {
        await database.get<Movie>("movies").create(movie => {
          movie.name = movies[i].name,
          movie.movieDate = movies[i].movieDate,
          movie.movieAverange = String(movies[i].movieAverange),
          movie.movieStatus = movies[i].movieStatus,
          movie.posterPath = movies[i].posterPath
        });
      }
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
  const moviesCollection = database.get<Movie>('movies');

  try {
    await database.write(async () => {
      const movie = await moviesCollection.find(movieId);

      movie.update((item) => {
        item.movieStatus = toggle;
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function handleDeleteMovie(movieId: string) {
  try {
    await database.write(async () => {
      const movie = await database.get('movies').find(movieId);
      await movie.destroyPermanently();
    });
  } catch (error) {
    console.error(error);
  }
}

export async function handleDeleteAllWatchedMovie() {
  try {
    await database.write(async () => {
      const moviesWatched = await database
        .get('movies')
        .query(Q.where("movieStatus", "true"))
        .fetch();

      const deleted = moviesWatched.map(async movies => await movies.destroyPermanently())

      database.batch(...deleted);
    });
  } catch (error) {
    console.error(error);
  }
}
