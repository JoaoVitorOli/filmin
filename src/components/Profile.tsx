import React from 'react';
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";
import { SheetManager } from 'react-native-actions-sheet';
import { useSelector } from 'react-redux';
import { IUserState } from '../store';
import FastImage from 'react-native-fast-image';
import { database } from '../db/index.native';
import withObservables from '@nozbe/with-observables';

interface ProfileProps {
  isClickable?: boolean;
}

export default function Profile({ isClickable = true }: ProfileProps) {
  function openActionSheetProfile() {
    SheetManager.show("profile_sheet");
  }

  const userPhoto = useSelector<IUserState, string>(state => {
    return state.user.profile;
  });

  return (
    <TouchableOpacity 
      onPress={() => openActionSheetProfile()} 
      activeOpacity={isClickable ? 0.8 : 1}
      style={{
        width: 47,
        height: 47,
        borderRadius: 12
      }}
    >
      {userPhoto ? (
        <FastImage 
          source={{ 
            uri: userPhoto,
            priority: FastImage.priority.low,
          }}
          style={{
            width: 47,
            height: 47,
            borderRadius: 12
          }}
        />
      ) : (
        <LinearGradient
          colors={['#4124C3', '#B144D4']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ 
            height: 47, 
            width: 47, 
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Icon 
            name="person-outline"
            size={25}
            color={"#fff"}
          /> 
        </LinearGradient>
      )}
    </TouchableOpacity>
  )
}
