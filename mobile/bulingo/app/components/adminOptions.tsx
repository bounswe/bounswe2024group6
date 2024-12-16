import React from 'react';
import { Text, View, StyleSheet, Modal, Pressable, TouchableOpacity, FlatList} from 'react-native';


type AdminOptionsProps = {
  options: Option[],
  onClose: () => void,
}

type Option = {
  text: string,
  onPress: () => void,
}

export default function AdminOptions(props: AdminOptionsProps){
  return (
    <Modal
      // animationType="slide"
      transparent={true}
      onRequestClose={props.onClose}
    >
      <Pressable style={styles.modalBackground} onPress={props.onClose}>
        <Pressable style={styles.modalContent}>
          <FlatList
            data={props.options}
            keyExtractor={(_, index)=>index.toString()}
            renderItem={ ({item}) => {
              return (
                <View style={styles.optionContainer}>
                  <TouchableOpacity onPress={item.onPress}>
                    <Text style={styles.optionText}>{item.text}</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            ListHeaderComponent={
              <View style={styles.headerContainer}>
                <Text style={styles.header}>Admin Options</Text>
              </View>
            }
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create(
  {
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      maxHeight: '60%',
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 3,
    },
    headerContainer: {
      borderBottomColor: 'black',
      borderBottomWidth: 2,
    },
    header: {
      fontSize: 26,
      fontWeight: 'bold',
    },
    optionContainer: {
      justifyContent: 'center',
      padding: 10,
      backgroundColor: 'white',
      elevation: 2,
    },
    optionText: {
      fontSize: 20,
    },
});