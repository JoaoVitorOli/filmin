import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { RecoilRoot, useSetRecoilState } from 'recoil';

import { AppContainer } from './src/components/AppContainer';
import Header from './src/components/Header';
import MovieList from './src/components/MovieList';
import { isFirstTimeOpenedState } from './src/recoil/isFirstTimeOpened';


import { theme } from './src/styles/theme';
import { getIfIsAppFirstTimeOpenedAsTrue } from './src/utils/asyncStorageFunctions';

const App = () => {
  const isAppFirstTimeOpened = useSetRecoilState(isFirstTimeOpenedState);

  useEffect(() => {
    getIfIsAppFirstTimeOpenedAsTrue().then(value => {
      if (value === "false") {
        isAppFirstTimeOpened(false);
      }
    });
  }, []);

  return (
    <RecoilRoot>
      <AppContainer>
        <StatusBar 
          barStyle={'light-content'}
          backgroundColor={theme.colors.shape}
        />
        <Header />

        <MovieList />
      </AppContainer>
    </RecoilRoot>
  );
};

export default App;
