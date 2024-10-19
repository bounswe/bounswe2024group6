import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '', confirmPassword: '', username: '' });
  const [level, setLevel] = useState('A1');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigation = useNavigation<any>();
  const [isTyping, setIsTyping] = useState(false);

  const updateFormValidity = () => {
    const hasErrors = Object.values(errors).some((error) => error !== '');
    const emtpyInput = username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '';
    setIsFormValid(!hasErrors && !emtpyInput);
  };

  const handleUsernameChange = (text: string) => {
    setIsTyping(true);
    setUsername(text);
  };

  const handleEmailChange = (text: string) => {
    setIsTyping(true);
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setIsTyping(true);
    setPassword(text);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setIsTyping(true);
    setConfirmPassword(text);
  };

  useEffect (() => {
    if (!isTyping) {
        updateFormValidity();
    }
  },[errors]);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsTyping(false);
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format' }));
    } else {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
    updateFormValidity();
  };

  const validatePassword = () => {
    setIsTyping(false);
    if (password.length < 6) {
      setErrors((prev) => ({ ...prev, password: 'Password must be at least 6 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, password: '' }));
    }

    if (confirmPassword != '' && confirmPassword !== password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    }
    else {
        setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }

    updateFormValidity();
  };

  const validateUsername = () => {
    setIsTyping(false);
    if (username.length < 3) {
      setErrors((prev) => ({ ...prev, username: 'Username must be at least 3 characters' }));
    } else {
      setErrors((prev) => ({ ...prev, username: '' }));
    }
    updateFormValidity();
  };

  const validateConfirmPassword = () => {
    setIsTyping(false);
    if (confirmPassword !== password) {
        setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prev) => ({ ...prev, confirmPassword: '' }));
    }
    updateFormValidity();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <View style={styles.navBar}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/images/home-icon.png')} style={styles.navIcon} />
            </TouchableOpacity>

            <View style={styles.quizContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Quizzes')}>
                <Text style={styles.navItem}>Quizzes</Text>
            </TouchableOpacity>
            </View>

            <View style={styles.forumContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Forum')}>
                <Text style={styles.navItem}>Forum</Text>
            </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Image source={require('../assets/images/profile-icon.png')} style={styles.navIcon} />
            </TouchableOpacity>
        </View>


      <Text style={styles.header}>Register</Text>

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        onBlur={() => validateEmail()}
      />
      <View style={{ minHeight: 18 }}>
       {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}
      </View>


      <Text style={styles.label}>Username:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={handleUsernameChange}
        onBlur={() => validateUsername()}
      />
      <View style={{ minHeight: 18 }}>
        {errors.username ? <Text style={styles.error}>{errors.username}</Text> : null}
      </View>


      <Text style={styles.label}>Password:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={handlePasswordChange}
        secureTextEntry
        onBlur={() => validatePassword()}
      />
      <View style={{ minHeight: 18 }}>
        {errors.password ? <Text style={styles.error}>{errors.password}</Text> : null}
      </View>


      <Text style={styles.label}>Password (Again):</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirm your password"
        value={confirmPassword}
        onChangeText={handleConfirmPasswordChange}
        secureTextEntry
        onBlur={() => validateConfirmPassword()}
      />
      <View style={{ minHeight: 18 }}>
        {errors.confirmPassword ? <Text style={styles.error}>{errors.confirmPassword}</Text> : null}
      </View>


      
      <Text style={styles.label}>Level:</Text>
      <Picker
        selectedValue={level}
        style={styles.picker}
        onValueChange={(itemValue) => setLevel(itemValue)}
      >
        <Picker.Item label="A1" value="A1" />
        <Picker.Item label="A2" value="A2" />
        <Picker.Item label="B1" value="B1" />
        <Picker.Item label="B2" value="B2" />
        <Picker.Item label="C1" value="C1" />
        <Picker.Item label="C2" value="C2" />
      </Picker>

      <TouchableOpacity 
        style={[styles.button, (!isFormValid || isTyping) ? styles.buttonDisabled : null]} // Disable styling
        disabled={!isFormValid || isTyping} // Disable button if there are errors
        onPress={() => console.log('email =', email, 'username =', username, 'password =', password, 'confirmPassword =', confirmPassword, 'level =', level)}
        >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  icon: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#800080',
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    backgroundColor: '#FFEB3B',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 0,
  },
  picker: {
    height: 50,
    backgroundColor: '#FFEB3B',
    borderRadius: 8,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#800080',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  quizContainer: {
    backgroundColor: '#9932CC', 
    borderRadius: 8,            
    marginHorizontal: 10, 
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  forumContainer: {
    backgroundColor: '#9932CC', 
    borderRadius: 8,            
    marginHorizontal: 10, 
    paddingHorizontal: 30,
    paddingVertical: 5,
  },
  navItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  error: {
    color: '#FF0000',
    fontSize: 13,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9', // Gray color when disabled
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Register;
