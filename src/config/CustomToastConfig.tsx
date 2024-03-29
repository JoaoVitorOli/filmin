import React from "react"
import { BaseToast, ToastOptions } from "react-native-toast-message"
import { theme } from "../styles/theme"

export const toastConfig = {
  success: (props: ToastOptions) => (
    <BaseToast
      {...props}
      
      style={{
        borderLeftColor: theme.colors.purple,
        backgroundColor: theme.colors.purple,
        height: 45,
        zIndex: 999998
      }}
      contentContainerStyle={{ 
        paddingHorizontal: 6,
        marginHorizontal: "auto",
        zIndex: 999998
      }}
      text1Style={{
        fontSize: 14,
        fontWeight: '500',
        fontFamily: "nunito_bold",
        color: theme.colors.text,
        zIndex: 999998
      }}
    />
  )
}