import { 
  ActivityIndicator,
  Keyboard, 
  Modal, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import React, { 
  useCallback,
  useEffect, 
  useState 
} from 'react';
import { default as IconFeather } from 'react-native-vector-icons/Feather';
import NetInfo from "@react-native-community/netinfo";

import { ButtonClose } from "./ButtonClose";
import { InputSearch } from "./InputSearch";

import { styles } from "./styles";
import { randomId } from "../../utils/randomId";
import { MovieList } from "./MovieList";
import { FetchMessageHandler } from "./FetchMessageHandler";
import { theme } from "../../styles/theme";
import { addNewMovie } from "../../db/services/Movie";

interface ModalAddMovieProps {
  isVisible: boolean;
  closeModal: () => void;
}

interface MovieProps {
  id: number;
  name: string;
  posterPath: string;
  movieAverange: number;
  movieDate: string;
  movieStatus: string;
}

export function ModalAddMovie({ 
  isVisible,
  closeModal
}: ModalAddMovieProps) {
  const [movieName, setMovieName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({} as MovieProps);
  const [movies, setMovies] = useState([]);
  const [hasAnyUnforeseen, setHasAnyUnforeseen] = useState("");
  const [isKeyShowing, setIsKeyShowing] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyShowing(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyShowing(false));

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    }
  }, [Keyboard]);

  // useEffect(() => {
  //   console.log(selectedMovie);
  // }, [selectedMovie]);

  const setMovieText = useCallback((value: string) => {
    setMovieName(value);
  }, []);

  function handleSelectMovie(item: MovieProps) {
    const data = {
      id: item.id,
      name: item.name,
      posterPath: `https://image.tmdb.org/t/p/w200${item.posterPath}`,
      movieAverange: item.movieAverange,
      movieDate: String(item.movieDate),
      movieStatus: "false"
    }

    setSelectedMovie(data);
  };

  async function handleAddMovie() {
    if (Object.entries(selectedMovie).length > 0) {
      await addNewMovie(selectedMovie);
    } else {
      await addNewMovie({
        name: movieName,
        posterPath: "",
        movieAverange: "",
        movieDate: "",
        movieStatus: "false",
      });
    }
    closeModal();
  }

  async function handleFetchMovie() {
    if (!movieName) {
      return;
    }

    let isConnected = true;

    const checkUserConnection = NetInfo.addEventListener(state => {
      isConnected = state.isConnected!;
    });

    checkUserConnection();

    if (!isConnected) {
      setHasAnyUnforeseen("noConnection");
    } else {
      setHasAnyUnforeseen("");
    }

    try {
      setIsFetching(true);

      const response = await fetch(`${process.env.TMDB_BASEAPI}?api_key=${process.env.TMDB_KEY}&language=pt-BR&query=${encodeURI(movieName)}&page=1&include_adult=false`, {
        method: "GET"
      })

      const data = await response.json();

      Keyboard.dismiss();

      if (data.total_results === 0) {
        setHasAnyUnforeseen("noResults");
        setIsFetching(false);
        return;
      }

      const dataFiltered = data.results.map((movie: { 
        title: string; 
        poster_path: string; 
        vote_average: number; 
        release_date: string; 
      }) => {
        return {
          id: randomId(),
          name: movie.title,
          posterPath: movie.poster_path,
          movieAverange: movie.vote_average,
          movieDate: String(new Date(movie.release_date).getFullYear()),
          movieStatus: "false"
        }
      });

      setIsFetching(false);
      setMovies(dataFiltered);
    } catch (error) {
      console.error("error");
      setIsFetching(false);
    }
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ButtonClose onRequestClose={closeModal} />

          <View style={styles.searchArea}>
            <InputSearch
              setText={setMovieText}
              value={movieName}
            />
            
            <TouchableOpacity 
              onPress={() => handleFetchMovie()} 
              style={styles.buttonSearch}
              activeOpacity={0.8}
            >
              {isFetching ? (
                <ActivityIndicator size="small" color={theme.colors.text} />
              ) : (
                <IconFeather
                  name="search"
                  size={20}
                  color={"#d2d2d2"}
                />
              )}
            </TouchableOpacity>
          </View>

          {!isKeyShowing && movies.length > 0 && !hasAnyUnforeseen && (
            <View style={styles.movieListContainer}>
              <MovieList
                movieSelected={selectedMovie}
                movies={movies}
                handleSelectMovie={handleSelectMovie}
              />
            </View>
          )}

          {hasAnyUnforeseen !== "" && (
            <FetchMessageHandler
              unforeseen={hasAnyUnforeseen}
            />
          )}

          <TouchableOpacity 
            onPress={() => handleAddMovie()} 
            style={[styles.buttonAddMovie, !movieName && styles.buttonAddMovieDisabled]}
            activeOpacity={0.8}
            disabled={!movieName}
          >
            <Text style={styles.text}>Adicionar</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </Modal>
  )
}
