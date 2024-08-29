// src/screens/HomeScreen.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import HomeCard from '../components/HomeCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import {HeartIcon} from 'react-native-heroicons/solid'
import { Image } from 'react-native';
const HomeScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.VCon}>
      <ScrollView style={styles.scView}>
    <View  style={{borderRadius:"50px",alignItems:'center',backgroundColor:'black'}}>
       <Image style={{width:300, height:100,objectFit:'contain'}} source={require("/Users/ashish/Desktop/webyapar/rickmorty/assets/rm.png")}/>
        </View>
    {/*  <Text style={{fontSize:60,fontWeight:'bold',color:"#000"}}>Rick</Text>
    <View style={{display:"inline",flex:1}}><Text style={{fontSize:50,fontWeight:'bold',display:'inline-block'}}>&</Text>
    <Text style={{fontSize:60,fontWeight:'bold',display:'inline-block',color:'green'}}>Morty</Text></View>
    <Text style={{fontSize:50,fontWeight:'bold'}}>wiki</Text>
    </View>*/}
      <HomeCard navigation={navigation} text={"Alive characters"} category_={'alive'} imagePath={require('/Users/ashish/Desktop/webyapar/rickmorty/assets/dead.jpg')}/>
      <HomeCard navigation={navigation} text="Dead Characters" category_={'dead'} imagePath={require('/Users/ashish/Desktop/webyapar/rickmorty/assets/all1.jpg')}/>
      <HomeCard navigation={navigation} text="All Characters" category_={'all'} imagePath={require('/Users/ashish/Desktop/webyapar/rickmorty/assets/alive.jpg')}/>
      </ScrollView>
      <View style={{display:'flex', position:'absolute', backgroundColor:'#fff', borderRadius:'100%',
       padding:10, flexDirection:"row",gap:5, alignItems:'center',
       justifyContent:"flex-start", marginBottom:5, 
        marginTop:600,alignSelf:'flex-end',
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2, marginRight:90, borderBlockColor:'#000',
        shadowRadius: 3}}>
            
            <TouchableOpacity onPress={()=>{navigation.navigate("Favourites")}}><HeartIcon  scale={"2"} size={40}color={'red'}/></TouchableOpacity>
            </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
   paddingHorizontal:2,
    height:'full',
    backgroundColor:"#fff"
  },
  VCon:{
    marginTop:50,
  },
  scView:{
    width: '100%',
    padding:10,
    height:'100%'
  },
  igB:{
height:120,
width:"100%",
  },
  title: {
    color:"#fff",
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    justifyContent:'left',
    justifySelf:'start',
    text:'left'
  },
  card: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
  },
});

export default HomeScreen;
