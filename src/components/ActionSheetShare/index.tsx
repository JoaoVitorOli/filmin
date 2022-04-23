import React, { useEffect, useState } from 'react';
import { 
  Text, 
  TouchableOpacity, 
  View,
} from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';
import { useSetRecoilState } from 'recoil';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';

import { theme } from '../../styles/theme';
import { styles } from "./styles";
import { InputCode } from './InputCode';
import { CopyCodeComponent } from './CopyCodeComponent';
import { addMovies, getAllMovies } from '../../db/services/Movie';
import { moviesWatchedState } from '../../recoil/watchedMovies';

interface IMovie {
  id: number;
  name: string,
  posterPath: string,
  averange: number,
  date: string,
  isChecked: boolean,
}

interface SupabaseFetchResponse {
  created_at: string,
  data: IMovie[],
  id: string,
}

export function ActionSheetShare() {
  const setWatchedMovies = useSetRecoilState(moviesWatchedState);

  const [inputCode, setInputCode] = useState("");
  const [androidId, setAndroidId] = useState("");
  const [showCode, setShowCode] = useState(false);

  useEffect(() => {
    async function getAndroidId() {
      const androidId = await DeviceInfo.getAndroidId();
  
      setAndroidId(androidId);
    }
    
    getAndroidId();
  }, []);

  useEffect(() => {
    return () => {
      setShowCode(false);
    }
  }, []);

  async function generateCode() {
    try {
      let userAlreadyInDatabase = false;
      const movies = await getAllMovies();

      const response = await fetch(`${process.env.SUPABASE_URL}?select=*`, {
        method: "GET",
        headers: {
          "apikey": process.env.SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY!}`
        }
      });

      const data: SupabaseFetchResponse[] = await response.json();

      if (data.length > 0) {
        data.map(movie => {
          if (movie.id === androidId) {
            userAlreadyInDatabase = true;
          }
        });
      }

      if (!userAlreadyInDatabase) {
        const body = {
          id: androidId,
          data: movies
        }

        await fetch(`${process.env.SUPABASE_URL}`, {
          method: "POST",
          headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
          },
          body: JSON.stringify(body)
        });

        setShowCode(true);

        return;
      }

      if (userAlreadyInDatabase) {
        const body = {
          data: movies
        }

        await fetch(`${process.env.SUPABASE_URL}?id=eq.${androidId}`, {
          method: "PATCH",
          headers: {
            "apikey": process.env.SUPABASE_ANON_KEY!,
            "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY!}`,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
          },
          body: JSON.stringify(body),
        });

        setShowCode(true);

        return;
      }

    } catch (error) {
      console.log(error);

      Toast.show({
        type: 'success',
        text1: 'Ocorreu um erro',
      });
    }
  }

  async function getMoviesFromDatabase() {
    if (!inputCode) {
      return;
    }

    try {
      let userExists = false;
      const movies = await getAllMovies();

      const response = await fetch(`${process.env.SUPABASE_URL}?select=*`, {
        method: "GET",
        headers: {
          "apikey": process.env.SUPABASE_ANON_KEY!,
          "Authorization": `Bearer ${process.env.SUPABASE_ANON_KEY!}`
        }
      });

      const data = await response.json();

      let moviesFetched = data.filter((user: SupabaseFetchResponse) => {
        if (user.id === inputCode) {
          userExists = true;

          return user.data;
        }
      });

      if (!userExists) {
        Toast.show({
          type: 'success',
          text1: 'Código inválido.',
        });

        return;
      }

      moviesFetched = moviesFetched[0].data;

      let moviesFiltered = [];

      for (let i = 0; i < moviesFetched.length; i++) {
        let idOfMovieFetchedExist = false;
        
        for (let i2 = 0; i2 < movies!.length; i2++) {
          if (moviesFetched[i].name === movies![i2].name) {
            idOfMovieFetchedExist = true;
          }
        }
        
        if (!idOfMovieFetchedExist) {
          if (moviesFetched[i].movieStatus === "true") {
            setWatchedMovies(state => state + 1);
          }

          moviesFiltered.push(moviesFetched[i]);
        }
      }

      await addMovies(moviesFiltered.reverse());
      setInputCode("");

      Toast.show({
        type: 'success',
        text1: 'Adicionando filmes.',
      });
    } catch (error) {
      console.log(error);
      
      Toast.show({
        type: 'success',
        text1: 'Ocorreu um erro.',
      });
    }
  } 

  return (
    <ActionSheet 
      id="share_sheet"
      containerStyle={{
        backgroundColor: theme.colors.shape,
        borderTopRightRadius: 8
      }}
      onClose={() => setShowCode(false)}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Compartilhar</Text>
        
        <Text style={styles.text}>Adicione o filme de seus amigos, basta colar o código:</Text>

        <View style={styles.inputContainer}>
          <InputCode
            setText={setInputCode}
            value={inputCode}
          />

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonDownloadMovies}
            onPress={() => getMoviesFromDatabase()}
          >
            <IconAntDesign
              name="download"
              size={20}
              color={"#d2d2d2"}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ ...styles.text, marginBottom: 18 }}>Ou copie seu código e mande para seus amigos:</Text>

        {!showCode ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.buttonGeneratShareCode}
            onPress={() => generateCode()}
          >
            <Text style={{ ...styles.text, fontFamily: "nunito_bold" }}>
              Gerar código
            </Text>
          </TouchableOpacity>
        ) : (
          <CopyCodeComponent androidId={androidId} />
        )}

      </View>
    </ActionSheet>
  )
}
