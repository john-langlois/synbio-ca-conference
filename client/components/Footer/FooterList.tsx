import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FooterItem from './FooterItem'
import {useNavigation, useRoute} from '@react-navigation/native';

const FooterList = () => {

  const navigation = useNavigation();
  const route = useRoute();
  
  return (
    <View style={styles.container}>
      <FooterItem text ="Home"  name="home" handlePress={()=> navigation.navigate("Home")} />
      <FooterItem text ="Connect" name="adduser" handlePress={()=> navigation.navigate("Manually Connect")}/>
      <FooterItem text ="Settings" name="setting" handlePress={()=> navigation.navigate("Settings")}r/>
    </View>
  )
}

export default FooterList

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 25,
    justifyContent: 'space-between',
  }
})