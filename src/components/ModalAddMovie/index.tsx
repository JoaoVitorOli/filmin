import { Button, Modal, Text, View } from "react-native";
import React from 'react';

import { styles } from "./styles";

interface ModalAddMovieProps {
  isVisible: boolean;
  closeModal: () => void;
}

export function ModalAddMovie({ 
  isVisible,
  closeModal
}: ModalAddMovieProps) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Opa</Text>
            <Button 
              title="teste"
              onPress={() => closeModal()}
            />
          </View>
        </View>
        
    </Modal>
  )
}
