import { Button, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef } from 'react';
import { default as IconFeather } from 'react-native-vector-icons/Feather';

import { styles } from "./styles";
import { ButtonClose } from "./ButtonClose";
import { InputSearch } from "./InputSearch";

interface ModalAddMovieProps {
  isVisible: boolean;
  closeModal: () => void;
}

export function ModalAddMovie({ 
  isVisible,
  closeModal
}: ModalAddMovieProps) {
  const inputValue = useRef<TextInput>(null);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <ButtonClose onRequestClose={closeModal} />

          <View style={styles.searchArea}>
            <InputSearch
              reference={inputValue}
            />
            
            <TouchableOpacity 
              onPress={() => {}} 
              style={styles.buttonSearch}
              activeOpacity={0.8}
            >
              <IconFeather
                name="search"
                size={20}
                color={"#d2d2d2"}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            onPress={() => {}} 
            style={styles.buttonAddMovie}
            activeOpacity={0.8}
          >
            <Text style={styles.text}>Adicionar</Text>
          </TouchableOpacity> 
        </View>
      </View>
    </Modal>
  )
}
