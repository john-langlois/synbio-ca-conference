import React from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

const WelcomeScreen: React.FC<StackScreenProps<any>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
             source = {require('../assets/SynbioLogo.jpeg')}
             style = {styles.image}
            />
      <TouchableOpacity style={styles.buttonStyle} onPress = {()=>navigation.navigate("Sign In")}>
        <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle} onPress = {()=>navigation.navigate("Sign Up")}>
        <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  buttonStyle: {
    backgroundColor: "black",
    height: 50,
    marginBottom: 30,
    justifyContent: "center",
    marginHorizontal: 15,
    borderRadius: 15,
    width:'55%',
    alignSelf: 'center',
},
buttonText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    textTransform: 'uppercase',
    fontWeight: 'bold'
},
image:{
  resizeMode:'contain',
  width : '100%',
  height : '20%',
  position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 9999,
}
});

export default WelcomeScreen;