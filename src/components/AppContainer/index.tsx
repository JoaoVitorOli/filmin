import { SafeAreaView, View } from "react-native";
import React, { useEffect, ReactNode } from 'react';

import { createNewUser, getUserInfo } from "../../db/services/User";
import { randomName } from "../../utils/randomName";
import { getAllMovies } from "../../db/services/Movie";

import { styles } from "./styles";
import { useSetRecoilState } from "recoil";
import { moviesWatchedState } from "../../recoil/watchedMovies";
import { userInfoState } from "../../recoil/userInfo";

interface AppContainer {
  children: ReactNode;
}

export function AppContainer({ children }: AppContainer) {
  const setWatchedMovies = useSetRecoilState(moviesWatchedState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    verifyifUserInfoExist();
    setInitialMoviesWatched();
  }, []);

  async function setInitialMoviesWatched() {
    const movies = await getAllMovies();

    let count = 0;

    if (movies) {
      movies.filter(movie => {
        if (movie.movieStatus === "true") count++
      });
    }

    setWatchedMovies(count);
  }

  async function verifyifUserInfoExist() {
    const userInfo = await getUserInfo();

    if (userInfo && userInfo.length === 0) {
      const user = {
        id: 1,
        name: randomName(),
        profile: ""
      }

      setUserInfo(user);
      createNewUser();
      
      return;
    }

    if (userInfo) {
      if (userInfo[0].name === "") {
        const user = {
          id: 1,
          name: randomName(),
          profile: userInfo[0].photo
        }

        setUserInfo(user);

        return;
      }

      const user = {
        id: 1,
        name: userInfo[0].name,
        profile: userInfo[0].photo
      }

      setUserInfo(user);
    }
  }

  return (
    <View style={styles.Container}>
      <SafeAreaView>
        {children}
      </SafeAreaView> 
    </View>
  )
}
