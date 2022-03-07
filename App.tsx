import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';

import { Background } from './src/components/Background';
import { Header } from './src/components/Header';
import { MovieList } from './src/components/MovieList';

import { createNewUser, getUserInfo } from './src/db/services/User';

import { theme } from './src/styles/theme';

const App = () => {
  useEffect(() => {
    async function verifyifUserInfoExist() {
      const userInfo = await getUserInfo();

      if (userInfo.length === 0) {
        createNewUser();
  
        return;
      }

      // await database.write(async () => {
      //   await database.unsafeResetDatabase();
      // })
    }

    verifyifUserInfoExist();
  }, []);

  return (
    <Background>
      <StatusBar 
        barStyle={'light-content'}
        backgroundColor={theme.colors.shape}
      />
      <Header />
      <MovieList />
    </Background>
  );
};

export default App;
