import React, { useEffect, useRef, useState } from 'react';
import { 
  Animated,
  StyleSheet, 
  Text, 
  TouchableOpacity 
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import Tooltip from 'react-native-walkthrough-tooltip';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { handleDeleteAllWatchedMovie } from '../../db/services/Movie';
import { isFirstTimeOpenedState } from '../../recoil/isFirstTimeOpened';
import { moviesWatchedState } from '../../recoil/watchedMovies';
import { theme } from '../../styles/theme';
import { setIfIsAppFirstTimeOpened } from '../../utils/asyncStorageFunctions';

export function ButtonDeleteAllWatchedMovies() {
  const setWatchedMovies = useSetRecoilState(moviesWatchedState);
  const isFirstTimeOpened = useRecoilValue(isFirstTimeOpenedState);

  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const positionAnimation = useRef(new Animated.Value(20)).current;

  const [isTooltipShowing, setIsTooltipShowing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    Animated.timing(
      fadeAnimation,
      {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }
    ).start();

    Animated.timing(
      positionAnimation,
      {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }
    ).start();
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => setTimer(state => state - 1), 1000);

    if (timer > 0) {
      timeOut;
    } else {
      setConfirmDelete(false);
      setIsTooltipShowing(false);
    }

    return () => {
      clearTimeout(timeOut);
    }
  }, [timer]);

  async function showConfirmDeleteButton() {
    if (confirmDelete) {
      await handleDeleteAllWatchedMovie();
      setWatchedMovies(0);

      return;
    }

    if (isFirstTimeOpened) {
      setIsTooltipShowing(true);
      await setIfIsAppFirstTimeOpened();
    }

    setConfirmDelete(true);
    setTimer(5);
  }

  return (
    <Tooltip
      isVisible={isTooltipShowing}
      backgroundColor={"transparent"}
      backgroundStyle={{
        backgroundColor: theme.colors.purple
      }}
      contentStyle={{
        backgroundColor: theme.colors.purple
      }}
      content={<Text style={styles.textTooltip}>Apagar todos os filmes assistidos?</Text>}
      placement="top"
      onClose={() => {}}
    >
      <Animated.View 
        style={{
          opacity: fadeAnimation,
          transform: [{translateY: positionAnimation}]
        }}
      >
        <TouchableOpacity 
          onPress={() => showConfirmDeleteButton()}
          style={{
            ...styles.button,
            height: 37, 
            width: 37, 
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.colors.danger,
          }}
          activeOpacity={0.8}
        >
          {confirmDelete ? (
            <Text style={styles.count}>{timer}</Text>
          ) : (
            <Icon 
              name="trash"
              size={20}
              color={"#fff"}
            />
          )}
        </TouchableOpacity>
      </Animated.View>
    </Tooltip>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12
  }, 

  count: {
    fontSize: 16,
    fontFamily: "nunito_bold",
    color: theme.colors.text
  },

  textTooltip: {
    color: theme.colors.text,
    fontFamily: "nunito_bold",
  }
});
