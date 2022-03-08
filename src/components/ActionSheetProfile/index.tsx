import React, { useCallback, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import ActionSheet from "react-native-actions-sheet";
import { default as IconFeather } from 'react-native-vector-icons/Feather';
import { default as IconAntDesign } from 'react-native-vector-icons/AntDesign';

import { Profile } from '../Profile';

import { theme } from '../../styles/theme';
import { styles } from "./styles";
import { getUserInfo, setUserName } from '../../db/services/User';

export function ActionSheetProfile() {
  const [inputName, setInputName] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  async function handleChangeUserName() {
    const userInfo = await getUserInfo();

    if (userInfo) {
      await setUserName(inputName, userInfo[0].id);
    }
  }

  return (
    <ActionSheet 
      id="profile_sheet"
      containerStyle={{
        backgroundColor: theme.colors.shape,
        borderTopRightRadius: 8
      }}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Personalizar</Text>

        <Profile isClickable={false} />

        <View style={styles.photoEditSection}>
          <TouchableOpacity 
            onPress={() => {}} 
            style={[styles.button, { 
              backgroundColor: theme.colors.purple,
              marginRight: 8
            }]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Editar foto</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}} 
            style={[styles.button, { backgroundColor: theme.colors.danger }]}
            activeOpacity={0.8}
          >
            <IconFeather
              name="trash"
              size={20}
              color={"#d2d2d2"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.nameEditSection}>
          <TextInput
            placeholder="Mudar nome"
            style={[styles.input, isInputFocused && styles.inputFocused]}
            value={inputName}
            onChangeText={(value) => setInputName(value)}
            selectionColor={theme.colors.text}
            placeholderTextColor={theme.colors.gray}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <TouchableOpacity 
            onPress={() => handleChangeUserName()} 
            style={[styles.button, { backgroundColor: theme.colors.purple }]}
            activeOpacity={0.8}
          >
            <IconAntDesign 
              name="edit"
              size={15}
              color={"#fff"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ActionSheet>
  )
}
