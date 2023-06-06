import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const FooterItem= ({name, text, handlePress}) => {
  return (
    <TouchableOpacity style = {styles.container} onPress={handlePress}>
        <>
        <Icon name={name} size={30} color='black' style = {styles.fontStyle}/>
        <Text style = {styles.iconText}>{text}</Text>
        </>
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
    fontStyle: {marginBottom:3, alignSelf:'center'},
    container:{
        flex:1,
        marginHorizontal:15,
    },
    iconText: {
        fontSize: 12,
         textAlign:'center',
          textTransform :'uppercase'}
})

export default FooterItem