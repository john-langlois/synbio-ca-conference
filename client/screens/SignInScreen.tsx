import React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();

const SignInScreen:React.FC<StackScreenProps<any>> =({navigation}) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: '',
    resetPasswordMessage: '',
  })

  async function signIn() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      let errorMessage = "Failed to do something exceptional";
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email address.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Wrong password. Please try again.';
      }
      setValue({
        ...value,
        error: errorMessage,
      })
    }
  }

  const handleForgotPassword = () => {
    sendPasswordResetEmail(auth, value.email)
      .then(() => {
        // Password reset email sent successfully
        setValue({...value, resetPasswordMessage: 'Password reset email sent, please check your inbox'});
      })
      .catch((error) => {
        // An error occurred while sending the password reset email
        setValue({...value, error: error.message});
        console.log('Error sending password reset email:', error);
      });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Image
        source={require('../assets/SynbioLogo.jpeg')}
        style={styles.image}
      />
      <View style={{ marginVertical: 100 }}>
        <View style={{ marginHorizontal: 24, marginTop: '15%' }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>EMAIL</Text>
          <TextInput
            placeholder='Email'
            value={value.email}
            onChangeText={text => setValue({ ...value, email: text })}
            style={styles.signupInput}
            autoComplete="email"
            keyboardType="email-address"
            autoCapitalize='none' />
        </View>
        <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: '#8e93a1' }}>PASSWORD</Text>
          <TextInput
            style={styles.signupInput}
            placeholder='Password'
            value={value.password}
            onChangeText={text => setValue({ ...value, password: text })}
            secureTextEntry
            autoComplete="password" />
        </View>
        {value.error !== "" && <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', marginBottom: '5%' }}>{value.error}</Text>
        </View>}
        {value.resetPasswordMessage !== "" && <View style={{ marginHorizontal: 24 }}>
          <Text style={{ fontSize: 16, color: 'green', textAlign: 'center', marginBottom: '5%' }}>{value.resetPasswordMessage}</Text>
        </View>}
        <Button title="Sign In" buttonStyle={styles.buttonStyle} onPress={signIn} />
        <Text style={{ fontSize: 16, textAlign: 'center' }} onPress={() => navigation.navigate('Sign Up')}>Not yet registered? Sign Up</Text>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={{ fontSize: 16, textAlign: 'center', marginTop: 20 }}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  signupText: {
    fontSize: 30,
    textAlign: 'center'
  },
  signupInput: {
    borderBottomWidth: 0.5,
    height: 48,
    borderBottomColor: "#8e93a1",
    marginBottom: 30,
  },
  buttonStyle: {
    backgroundColor: "black",
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    marginHorizontal: 85,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
  },
  image: {
    resizeMode: 'contain',
    width: '80%',
    height: '20%',
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 9999,
    marginLeft: 35,
  }
});

export default SignInScreen;
