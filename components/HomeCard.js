import { View, Touchable } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {  Text, StyleSheet } from 'react-native';
import { Image } from 'react-native'
import { pic1 } from '../assets/pics';
import {LinearGradient} from 'expo-linear-gradient';

const HomeCard = ({navigation,text,category_,imagePath}) => {
    const headerTitle = category_ === 'alive'
    ? 'Alive Characters'
    : category_ === 'dead'
    ? 'Dead Characters'
    : 'All Characters';
  return (
    
    <View style={{borderRadius:"40px"}}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('CharacterList', { category: category_ ,headerTitle})}>
        <Image source={imagePath} style={styles.cardImg}/>
        
        <LinearGradient colors={[ 'transparent','rgba(0,0,0,1)']} style={styles.linearGradient}>
            <Text style={styles.cardText}>{text}</Text>
            </LinearGradient>
    </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    linearGradient: {
        borderRadius: 5,
        zIndex:-20,alignItems:'center',
        textAlign:'center',
        width:"100%",
        position:"absolute",
        height:'100%',
        zIndex:2,
        borderRadius:"12px"
      },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      width: 'cover',
      padding: 20,
      width:350,
      height:200,
      marginVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 10,
      alignItems: 'center',
      padding:0,
      borderRadius:15
    },
    cardText: {
      fontSize: 18,
      fontWeight: '500',
    marginTop:150,
    color:"#fff",
    fontWeight:'bold',
    fontSize:30,
    },
    cardImg: {
        height:'100%',
        width:'100%',
        borderRadius:15,
        zIndex:1
    }
  });
  

  

export default HomeCard
