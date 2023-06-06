import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
const auth = getAuth();

const SignUpScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: '',
    password: '',
    error: ''
  })

  

  async function signUp() {
    if (value.email === '' || value.password === '') {
      setValue({
        ...value,
        error: 'Email and password are mandatory.'
      })
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, value.email, value.password);
      navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: 'Error signing up. Please try again later.',
      })
    }
  }

  return (
    <KeyboardAvoidingView
    style = {styles.container}
    behavior='padding'>
        <Image
             source = {require('../assets/SynbioLogo.jpeg')}
            style={styles.image}
            />
      
      <View style = {{marginHorizontal:24}}>
            <Text style = {{fontSize:16, color:'#8e93a1'}}>Email</Text>
            <TextInput placeholder = 'Email'
              value = {value.email}
              onChangeText = {text => setValue({ ...value, email: text })}
            style = {styles.signupInput}
             autoComplete='email'
              keyboardType="email-address" 
              autoCapitalize='none'/>
      </View>
      <View style = {{marginHorizontal:24}}>
            <Text style = {{fontSize:16, color:'#8e93a1'}}>Password</Text>
            <TextInput 
            placeholder = 'Password'
            value = { value.password}
            onChangeText = {text => setValue({ ...value, password: text })}
            style = {styles.signupInput}
            secureTextEntry
            autoCorrect={false}/>
      </View>
      {value.error != "" && <View style={{ marginHorizontal: 24 }}>
                    <Text style={{ fontSize: 16, color: 'red', textAlign: 'center', marginBottom:'5%' }}>{value.error}</Text>
              </View>} 
            <Button title="Sign up" buttonStyle={styles.buttonStyle} onPress={signUp} />
      <Text style = {{fontSize: 16, textAlign:'center'}} onPress={() => navigation.navigate('Sign In')}> Already Joined? Sign in</Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor:'white'
  },
  signupInput:{
    borderBottomWidth:0.5,
    height:48,
    borderBottomColor:'#8e93a1',
    marginBottom:30,
    width:'100%',
  },
  buttonStyle:{
    backgroundColor:'black',
    height:48,
    marginBottom:20,
    marginTop:20,
    justifyContent:'center',
    marginHorizontal:85,
    borderRadius:15,
  },
  buttonText:{
    fontSize:25,
    textAlign:'center',
    color:'#ffff',
    textTransform:'uppercase',
    fontWeight:'bold',
  },
  image:{
    resizeMode:'contain',
    width : '80%',
    height : '20%',
    position: 'absolute',
      top: 20,
      left: 0,
      right: 0,
      zIndex: 9999,
      marginLeft:35,
  }
});

export default SignUpScreen;