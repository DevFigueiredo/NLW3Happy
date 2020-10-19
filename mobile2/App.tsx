import React from 'react';
import {useFonts} from 'expo-font'
import {Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold} from '@expo-google-fonts/nunito';
import OrphanagesMap from './src/pages/OrphanagesMap';
import Routes from './src/routes';

export default function App() {
  let [fontsLoaded] = useFonts({
    Nunito_800ExtraBold,
    Nunito_700Bold,
    Nunito_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  } 

  
  return (
    <Routes/>
   
  );
}

