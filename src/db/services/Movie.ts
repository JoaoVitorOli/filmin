import { database } from "../index.native";
import Movie from "../model/Movie";
import User from "../model/User";

type MovieProps = {
  id?: string | number;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  status: boolean;
}

export async function addNewMovie({
  averange, 
  date, 
  status, 
  name, 
  posterPath
}: MovieProps) {
  try {
    await database.write(async () => {
      await database.get<Movie>("movies").create(movie => {
        movie.name = name,
        movie.date = date,
        movie.averange = averange,
        movie.status = status,
        movie.posterPath = posterPath
      });
    });

    // await database.write(async () => {
    //   await database.unsafeResetDatabase();
    // })
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
          status: entrie.status!
        }
      });
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function toggleCheckMovie(movieId: string, toggle: boolean) {
  const userCollection = database.get<Movie>('movies');

  try {
    await database.write(async () => {
      const movie = await userCollection.find(movieId);

      movie.update((item) => {
        item.status = toggle;
      });
    });
  } catch (error) {
    console.log(error);
  }
}

export async function handleDeleteTask(movieId: string) {
  try {
    await database.write(async () => {
      const movie = await database.get('movies').find(movieId);
      await movie.destroyPermanently();
    });
  } catch (error) {
    console.log(error);
  }
}
