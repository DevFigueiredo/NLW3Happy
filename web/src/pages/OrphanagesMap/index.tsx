import React from 'react';
import {Link} from 'react-router-dom';

import MapMarker from '../../images/LogoIcon.svg';
import {FiPlus} from 'react-icons/fi'
import L from 'leaflet';


import './styles.css';

import { Map, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const happyMapIcon = L.icon({
    iconUrl: MapMarker,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [0, -60]
  })


function OrpahangesMap(){
return (
<div id="page-map">
    <aside>
        <header>
            <img src={MapMarker} alt="Marcador do Mapa"/>
            <h2>Escolha um orfanato no mapa</h2>
            <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        
        <footer>
            <strong>Caraguatatuba</strong>
            <span>São Paulo</span>
        </footer>
    </aside>

    <div style={{ width: '100%' , background: 'red', display: 'flex'}}>
             <Map 
                center={[-27.2092052,-49.6401092]} 
                zoom={16} 
                style={{ width: '100%'}}
               
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} />
               </Map>
   
             </div>

    <Link to="orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF"/>
    </Link>
    </div>

);
}

export default OrpahangesMap;