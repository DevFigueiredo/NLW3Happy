import React, { useState, FormEvent } from 'react';
import { ScrollView, View, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';
import api from '../../services/api';

export default function OrphanageData() {
  const [name, setName]= useState("");
  const [about, setAbout]= useState("");
  const [instructions, setInstructions]= useState(""); 
  const [opening_hours, setOpening_hours]= useState("");
  const [open_on_weekends, setOpen_on_weekends]= useState(true);
  const [images, SetImages] = useState<string[]>([])
  
  const routes = useRoute();
  const navigation = useNavigation();

  async function CreateOrphanageSubmit(){
    const{position} = routes.params;

    const OrphanageData = new FormData();
      OrphanageData.append('name',name)
      OrphanageData.append('about',about)
      OrphanageData.append('instructions',instructions)
      OrphanageData.append('opening_hours',opening_hours)
      OrphanageData.append('open_on_weekends',String(open_on_weekends))
      OrphanageData.append('latitude',String(position.latitude))
      OrphanageData.append('longitude',String(position.longitude))
      images.forEach((image, index)=>{
      OrphanageData.append('images', {
        name: `image_${index}.jpg`,
        type: 'image/jpg',
        uri: image,

      }as any)
      })
     const responseSubmit = await api.post("/orphanages",OrphanageData)
      
     if(responseSubmit.status==201){
     navigation.navigate('OrphanagesMap')
    }

    }


    async function HandleSelectImages(){
      const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
      if(status!=="granted"){
        alert("Precisamos que permita o acesso da galeria.")
        return
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        //POssibilidade de cortar a imagem
        allowsEditing: true,
        //QUalidade de imagem
        quality: 1,
        //Permite visualizar apenas imagens da galeria
        mediaTypes: ImagePicker.MediaTypeOptions.Images
      })

      if(result.cancelled){
        return;
      }

      const {uri} = result;
      SetImages([...images, uri])

    }


  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Sobre</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={about}
        onChangeText={setAbout}
      />

    {/*  <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
        
      />
  */}
      <Text style={styles.label}>Fotos</Text>
      
      <View style={styles.UploadImagesContainer}>
        {images.map(image=>{
          return(
           <Image style={styles.UploadedImage} key={image} source={{uri: image}}/>
          );
        })}
      </View>
      <TouchableOpacity style={styles.imagesInput} onPress={HandleSelectImages}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      <Text style={styles.title}>Visitação</Text>

      <Text style={styles.label}>Instruções</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
        value={instructions}
        onChangeText={setInstructions}
      />

      <Text style={styles.label}>Horario de visitas</Text>
      <TextInput
        style={styles.input}
        value={opening_hours}
        onChangeText={setOpening_hours}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Atende final de semana?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
          value={open_on_weekends}
        onValueChange={setOpen_on_weekends}
        />
      </View>

      <RectButton style={styles.nextButton} onPress={CreateOrphanageSubmit}>
        <Text style={styles.nextButtonText}>Cadastrar</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 32,
    paddingBottom: 24,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#8fa7b3',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 20,
    height: 56,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 20,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },

  UploadImagesContainer:{
     flexDirection: 'row',
   
  },
  UploadedImage:{
    width: 64,
    height: 64,
    borderRadius: 20,
    marginBottom: 32,
    marginRight: 8
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },

  nextButton: {
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    marginTop: 32,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})