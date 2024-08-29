// src/screens/CharacterDetailScreen.js
/*
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
const CharacterDetailScreen = ({ route }) => {
  const { character } = route.params;
  const[eps,seteps]=useState([])
  const fetchEps = async (ep) => {
    try {
      let url =ep;
      if (category === 'alive' || category === 'dead') {
        url += `?status=${category}`;
      }
      const response = await axios.get(url);
      seteps(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text>Status: {character.status}</Text>
      <Text>Species: {character.species}</Text>
      <Text>Gender: {character.gender}</Text>
      <Text>Origin: {character.origin.name}</Text>
      <Text>Episodes:</Text>
      {character.episode.map((ep, index) => (
        <Text key={index}>{ep}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default CharacterDetailScreen;
*/
import { useCallback } from 'react';
import { Button, Touchable, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite,removeFavorite } from '../redux/actions';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import { female, femaleIcon, male, maleIcon } from '../assets/svgFile';
import { HeartIcon } from 'react-native-heroicons/solid';

const CharacterDetailScreen = ({ route }) => {
  const { character } = route.params;
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const handleFavoriteToggle = useCallback(() => {
    if (isFavorite) {
      dispatch(removeFavorite(character.id));
    } else {
      dispatch(addFavorite(character));
    }
  }, [isFavorite, character, dispatch]);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch episode details
  const fetchEpisodes = async () => {
    try {
      const episodePromises = character.episode.map((ep) => axios.get(ep));
      const episodeResponses = await Promise.all(episodePromises);
      const episodeData = episodeResponses.map((response) => response.data);
      setEpisodes(episodeData);
    } catch (error) {
      console.error('Error fetching episode data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  return (
    <View >
        <ScrollView contentContainerStyle={{alignItems:'center',marginTop:10,padding:10}}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View>
      <Text style={styles.name}>{character.name}</Text>
     
      </View>
      <View>
      <View style={{display:'flex',flexWrap:'flex',flexDirection:'row',width:'100%',justifyContent:'space-evenly'}}>
      <View style={styles.statusCard}><Text style={styles.statText}>{(character.status==="Dead")? 
        <View style={{alignItems:'center',display:'flex', flexDirection:'column',textAlign:'center'}}>
        <Text style={{textAlign:'center',marginTop:10,fontSize:40}}>💀</Text>
      <Text style={{fontWeight:"bold",marginTop:5,fontSize:20}}>Dead</Text></View>
      :<View style={{alignItems:'center',display:'flex', flexDirection:'column',textAlign:'center'}}>
        <Text style={{textAlign:'center',marginTop:10,fontSize:40}}>❤️</Text>
      <Text style={{fontWeight:"bold",marginTop:5,fontSize:20}}>Alive</Text></View>}</Text></View>
     <View style={styles.statusCard}><Text style={styles.statText}>{(character.species==="Human")? <View style={{alignItems:'center',display:'flex', flexDirection:'column',textAlign:'center'}}>
        <Text style={{textAlign:'center',marginTop:10,fontSize:40}}>🏋</Text><Text style={{fontWeight:"bold",marginTop:5,fontSize:20}}>Human</Text></View>
        :<View style={{alignItems:'center',display:'flex', flexDirection:'column',textAlign:'center'}}><Text style={{textAlign:'center',marginTop:10,fontSize:40}}>🛸</Text><Text style={{fontWeight:"bold",marginTop:5,fontSize:20}}>Alien</Text></View>}</Text></View>
      </View>
      <View style={{display:'flex',flexWrap:'flex', marginTop:10,flexDirection:'row',width:'100%',justifyContent:'space-evenly'}}>
      <View style={styles.statusCard1}><Text style={styles.statText} >{character.origin.name}</Text></View>
      </View>
      </View>
      
      <TouchableOpacity  onPress={handleFavoriteToggle} style={{ backgroundColor:"#fff", display:'flex', gap:10,flexDirection:'row', justifyContent:'center',alignItems:'center',padding:30,marginTop:10,borderRadius:'100%'}}>
      {isFavorite ? <HeartIcon color={"red"}/>:  <HeartIcon color={"grey"}/>}
        <Text style={{fontWeight:'bold'}}>{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</Text></TouchableOpacity>

      <Text style={{alignSelf:'flex-start',fontWeight:'bold',fontSize:20,
      marginTop:20}}>🎬Episodes:</Text>
      <ScrollView style={{width:'100%'}}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        
        episodes.map((episode, index) => (
          <View key={index} style={styles.episodeContainer}>
            <Text style={{  color:'gray'}}>#{episode.episode}</Text>
            <Text style={{fontWeight:'bold',fontSize:20}}>Name: {episode.name}</Text>
            <Text style={styles.episodeText}>Air Date: {episode.air_date}</Text>
          </View>
        ))
      )}
      </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    statusCard:{backgroundColor:"#fff",borderRadius:16,width:150,padding:30,
         textAlign:'center',
  alignItems:'center',
  fontWeight:'bold',
  fontSize:20,
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3
    },
    statusCard1:{backgroundColor:"#fff",borderRadius:16,width:'100%',padding:30,
        textAlign:'center',
 alignItems:'center',
 fontWeight:'bold',
 fontSize:20,
 shadowColor: '#171717',
 shadowOffset: {width: -2, height: 4},
 shadowOpacity: 0.2,
 shadowRadius: 3
   },
    statText:{
        fontSize:14,
        textAlign:'center',
        justifyContent:'center',
        fontWeight:'bold',
    },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
 
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    height:'fit',
    
  },
  episodeContainer: {
    height:'fit',
    padding:10,
    width:'100%',
    borderRadius:7,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor:'#fff',
    marginTop: 10,
    
  },
  episodeText: {
    fontSize: 16,
  
  },
});

export default CharacterDetailScreen;
