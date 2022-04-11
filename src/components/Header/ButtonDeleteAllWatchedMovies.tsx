import React, { useEffect, useRef, useState } from 'react';
import { 
  Animated,
  StyleSheet, 
  Text, 
  TouchableOpacity 
} from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { useSetRecoilState } from 'recoil';
import { handleDeleteAllWatchedMovie } from '../../db/services/Movie';
import { moviesWatchedState } from '../../recoil/watchedMovies';
import { theme } from '../../styles/theme';

export function ButtonDeleteAllWatchedMovies() {
  const setWatchedMovies = useSetRecoilState(moviesWatchedState);
  const fadeAnimation = useRef(new Animated.Value(0)).current;
  const positionAnimation = useRef(new Animated.Value(20)).current;
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

    setConfirmDelete(true);
    setTimer(5);
  }

  return (
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
          marginRight: 12
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
  }
})
