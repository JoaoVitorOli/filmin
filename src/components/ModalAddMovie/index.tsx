import { 
  Keyboard, 
  Modal, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import React, { 
  useCallback,
  useEffect, 
  useRef, 
  useState 
} from 'react';
import { default as IconFeather } from 'react-native-vector-icons/Feather';
import NetInfo from "@react-native-community/netinfo";

import { ButtonClose } from "./ButtonClose";
import { InputSearch } from "./InputSearch";

import { styles } from "./styles";
import { randomId } from "../../utils/randomId";
import { MovieList } from "./MovieList";

interface ModalAddMovieProps {
  isVisible: boolean;
  closeModal: () => void;
}

interface MovieProps {
  id: number;
  name: string;
  posterPath: string;
  averange: number;
  date: string;
  isChecked: boolean;
}

export function ModalAddMovie({ 
  isVisible,
  closeModal
}: ModalAddMovieProps) {
  const [movieName, setMovieName] = useState("");
  const [selectedMovie, setSelectedMovie] = useState({} as MovieProps);
  const [movies, setMovies] = useState([]);
  const [hasConnection, setHasConnection] = useState(true);
  const [totalResults, setTotalResults] = useState(true);
  const [isKeyShowing, setIsKeyShowing] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setIsKeyShowing(true));
    Keyboard.addListener('keyboardDidHide', () => setIsKeyShowing(false));

    return () => {
      Keyboard.removeAllListeners("keyboardDidShow");
      Keyboard.removeAllListeners("keyboardDidHide");
    }
  }, [Keyboard]);

  const setMovieText = useCallback((value: string) => {
    setMovieName(value);
  }, []);

  const handleSelectMovie = useCallback((item: MovieProps) => {
    const data = {
      id: item.id,
      name: item.name,
      posterPath: `https://image.tmdb.org/t/p/w200${item.posterPath}`,
      averange: item.averange,
      date: item.date,
      isChecked: false
    }

    setSelectedMovie(data);
  }, [selectedMovie]);

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
      setHasConnection(false);
    } else {
      setHasConnection(true);
    }

    try {
      // setHasError(false);
      // setIsFetching(true);

      const response = await fetch(`${process.env.TMDB_BASEAPI}?api_key=${process.env.TMDB_KEY}&language=pt-BR&query=${encodeURI(movieName)}&page=1&include_adult=false`, {
        method: "GET"
      })

      const data = await response.json();

      Keyboard.dismiss();

      setTotalResults(data.total_results);

      const dataFiltered = data.results.map((movie: { title: string; poster_path: string; vote_average: string; release_date: string; }) => {
        return {
          id: randomId(),
          name: movie.title,
          posterPath: movie.poster_path,
          averange: movie.vote_average,
          date: movie.release_date,
          isChecked: false
        }
      });

      // setIsFetching(false);
      setMovies(dataFiltered);
    } catch (error) {
      console.log(error);
      // setIsFetching(false);
      // setHasError(true);
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
              <IconFeather
                name="search"
                size={20}
                color={"#d2d2d2"}
              />
            </TouchableOpacity>
          </View>

          {!isKeyShowing && movies.length > 0 && (
            <View style={styles.movieListContainer}>
              <MovieList
                movieSelected={selectedMovie}
                movies={movies}
                handleSelectMovie={handleSelectMovie}
              />
            </View>
          )}

          <TouchableOpacity 
            onPress={() => {}} 
            style={styles.buttonAddMovie}
            activeOpacity={0.8}
          >
            <Text style={styles.text}>Adicionar</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </Modal>
  )
}
