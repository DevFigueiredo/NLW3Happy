import React,{useEffect, useState} from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Callout} from 'react-native-maps';
import MapMarkrImg from '../../images/IconMarker.png';
import {Feather} from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';

interface Orphanage{
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}
export default function OrpahanagesMap() {
    const [orphanages, SetOrphanages] = useState<Orphanage[]>([]);
    const navigation = useNavigation();

    function HandleNavigateToOrphanageDetails(id: number)
    {
    navigation.navigate('OrphanageDetails', {id});
    }

    
    function HandleNavigateToCreateOrphanate(){
      navigation.navigate('SelectMapPosition');
      }
      
      useFocusEffect(()=>{
        api.get('orphanages').then(response=>{
          SetOrphanages(response.data);
         
   

         })
      })
    return (
        <View style={styles.container}>
      
    <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={{
      latitude: -23.71761965936653, 
      longitude:  -45.44026950958164,
      latitudeDelta:0.008 ,
      longitudeDelta:0.008 ,
      }}>
      {orphanages.map(orphanage=>{return (
         <Marker 
         key={orphanage.id}
         calloutAnchor={{
           x:2.6,
           y:0.8
         }} 
         icon={MapMarkrImg}  
         coordinate={{latitude:orphanage.latitude, longitude:orphanage.longitude,}}>
         
         <Callout tooltip={true} onPress={()=>HandleNavigateToOrphanageDetails(orphanage.id)}>
            <View style={styles.calloutContainer}>
              <Text style={styles.calloutText}>{orphanage.name}</Text>
            </View>
          </Callout>
         
           </Marker>
      )})}


      </MapView>
      <View style={styles.footer}>
       <Text style={styles.footerText}>{orphanages.length} orfanatos encontrados</Text>
       <RectButton style={styles.createOrphanageButton} onPress={HandleNavigateToCreateOrphanate}>
       <Feather name="plus" size={20} color="#FFF"/>
       </RectButton>
      </View>
    
    
      </View>
      );
    
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map:{
      flex: 1,
      width: Dimensions.get('window').width,
      height:Dimensions.get('window').height,
    },
    calloutContainer:{
     width: 160,
     height: 46,
     paddingHorizontal:16,
     backgroundColor: 'rgba(255,255,255,0.8)',
     borderRadius: 16,
     justifyContent: 'center'
    },
    calloutText:{
     color: '#0089a5',
     fontSize: 14,
     fontFamily: 'Nunito_700Bold'
  
    },
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom:32,
      backgroundColor: "#FFFF",
      borderRadius: 20,
      height:56,
      paddingLeft:24,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      elevation: 5,
      shadowOpacity: 5
    },
    footerText:{
      color: '#8fa7b3',
      fontFamily: 'Nunito_700Bold'
    },
    createOrphanageButton:{
      width:56,
      height: 56,
      backgroundColor: '#15c3d6',
      borderRadius:20,
      justifyContent: 'center',
      alignItems: 'center'
    }
   
  });
  