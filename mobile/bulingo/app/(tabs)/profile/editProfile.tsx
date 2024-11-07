import React, { useState, useRef, useEffect, MutableRefObject } from 'react';
import { TouchableOpacity, Image, View, StyleSheet, Text, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ImageSourceOverlay } from './imageSourceOverlay';
import { Dropdown } from 'react-native-element-dropdown';


export default function EditProfile() {
  const [image, setImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);


  // Removes the highlight from the text input fields if the keyboard is hidden.
  const inputRefs = [
    useRef<TextInput>(),
    useRef<TextInput>(),
  ];
  useEffect(() => {
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      inputRefs.forEach((ref) => ref.current?.blur()); // Remove focus from TextInputs
    });

    return () => {
      keyboardListener.remove(); // Cleanup listener on component unmount
    };
  }, []);

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      closeModal();
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      closeModal();
    }
  };

  const onSaveChanges = () => {

  };

  const handleChangePicturePress = () => {
    Keyboard.dismiss();
    openModal();
  };

  const levels = [
    {label: 'A1', value: 'A1'},
    {label: 'A2', value: 'A2'},
    {label: 'B1', value: 'B1'},
    {label: 'B2', value: 'B2'},
    {label: 'C1', value: 'C1'},
    {label: 'C2', value: 'C2'},
  ];

  return (
    <>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profilePictureContainer}>
        <Image source={image ? { uri: image } : require("@/assets/images/profile-icon.png")} style={styles.profilePicture} />
      </View>
      <TouchableOpacity onPress={handleChangePicturePress}>
        <View style={styles.changePictureBox}>
          <Text style={styles.changePictureText}>Change Profile Picture</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.editableFieldsContainer}>
        <EditableField ref={inputRefs[0]} name='Name' defaultValue='Yagiz Guldal'/>
        <EditableField ref={inputRefs[1]} name='About Me' defaultValue='Hello, I am Yagiz. I am an avid language learner!'/>
        <DropdownField label='Level' options={levels} defaultValue='B2'/>
      </View>
      <View style={styles.saveButtonContainer}>
        <TouchableOpacity style={styles.saveButton} onPress={onSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </TouchableWithoutFeedback>
    {isModalVisible && (
        <ImageSourceOverlay closeModal={closeModal} onLeftOption={takePicture} onRightOption={pickImage}/>
    )}
    </>
    
  );
}

type EditableFieldProps = {
  name: string,
  defaultValue?: string, 
  onChangeText?: (newText: string) => void,
};

const EditableField = React.forwardRef((props: EditableFieldProps, ref: any) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
      <View style={styles.editableField}>
        <Text style={[styles.editableFieldName, isFocus && { color: 'blue' }]}>{props.name}</Text>
        <View style={[styles.editableFieldBox, isFocus && { borderColor: 'blue' }]}>
          <TextInput 
            ref={ref}
            style={[styles.editableFieldInput]}
            onChangeText={props.onChangeText}
            defaultValue={props.defaultValue}
            placeholder={"Choose a new " + props.name + " !"}
            multiline={true}
            onFocus={() => setIsFocus(true)}
            onEndEditing={() => setIsFocus(false)}
          />
        </View>
      </View>
  );
});

type DropdownFieldProps = {
  options: {label: string, value: string}[],
  defaultValue: string,
  label: string,
  onChange?: (item: {label: string, value: string}) => void
};

const DropdownField = (props: DropdownFieldProps) => {
  const [value, setValue] = useState(props.defaultValue);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.editableField}>
      <Text style={[styles.editableFieldName, isFocus && { color: 'blue' }]}>
          Level
      </Text>
      <View style={[styles.editableFieldBox, isFocus && { borderColor: 'blue' }]}>
        <Dropdown
          style={styles.dropdown}
          selectedTextStyle={styles.editableFieldInput}
          data={props.options}
          maxHeight={300}
          labelField="label"
          valueField="value"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          autoScroll={false}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
            props.onChange && props.onChange(item);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  profilePictureContainer: {
   flex: 0,
   justifyContent: 'center',
   alignItems: 'center',
   margin: 10
  },
  profilePicture: {
    width: 150,
    height: 150,
    borderRadius: 75,
    margin: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  changePictureBox: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(106, 156, 255, 1)',
    borderRadius: 8,
    padding: 10,
  },
  changePictureText: {
    fontSize: RFPercentage(2.2),
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  editableFieldsContainer: {
    flex: 0,
    margin: 10,
    alignItems: 'stretch',
  },
  editableField: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 8,
    margin: 10,
  },
  editableFieldName: {
    fontSize: RFPercentage(1.8),
    padding: 5,
  },
  editableFieldBox: {
    padding: 5,
    borderTopWidth: 2,
    borderColor: 'black',
  },
  editableFieldInput: {
    fontSize: RFPercentage(2.2),
  },
  dropdown: {
    flex: 0,
    paddingVertical: 3,
  },
  saveButtonContainer: {
    flex: 0,
    alignItems: 'center',
    margin: 10,
    padding: 5,
  },
  saveButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(106, 156, 255, 1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: RFPercentage(2.4),
    color: 'white',
    fontWeight: 'bold',
  },
});
