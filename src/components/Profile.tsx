import React from 'react';
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from "react-native-linear-gradient";
import { SheetManager } from 'react-native-actions-sheet';
import FastImage from 'react-native-fast-image';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../recoil/userInfo';

interface ProfileProps {
  isClickable?: boolean;
}

export default function Profile({ isClickable = true }: ProfileProps) {
  const userInfo = useRecoilValue(userInfoState);
  
  function openActionSheetProfile() {
    SheetManager.show("profile_sheet");
  }
  
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
      {userInfo.profile ? (
        <FastImage 
          source={{ 
            uri: userInfo.profile,
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
