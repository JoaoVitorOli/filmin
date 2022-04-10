import { SafeAreaView, View } from "react-native";
import React, { useEffect, ReactNode } from 'react';

import { styles } from "./styles";
import { useDispatch } from "react-redux";
import { createNewUser, getUserInfo } from "../../db/services/User";
import { randomName } from "../../utils/randomName";
import { setInitialValue } from "../../store/modules/user/actions";

interface AppContainer {
  children: ReactNode;
}

export function AppContainer({ children }: AppContainer) {
  const dispatch = useDispatch();

  useEffect(() => {
    verifyifUserInfoExist();
  }, []);

  async function verifyifUserInfoExist() {
    const userInfo = await getUserInfo();

    if (userInfo && userInfo.length === 0) {
      const user = {
        id: 1,
        name: randomName(),
        profile: ""
      }

      dispatch(setInitialValue(user));
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

        dispatch(setInitialValue(user));

        return;
      }

      const user = {
        id: 1,
        name: userInfo[0].name,
        profile: userInfo[0].photo
      }

      dispatch(setInitialValue(user));
    }
    
    // await database.write(async () => {
    //   await database.unsafeResetDatabase();
    // })
  }

  return (
    <View style={styles.Container}>
      <SafeAreaView>
        {children}
      </SafeAreaView> 
    </View>
  )
}
