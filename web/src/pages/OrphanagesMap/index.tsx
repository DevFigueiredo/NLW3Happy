import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import MapMarker from '../../images/LogoIcon.svg';
import './styles.css';
import 'leaflet/dist/leaflet.css';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import happyMapIcon from '../../components/HappyMapIconLeaflet';
import api from '../../services/api';



interface Orphanage{
            id: number;
            name: string;
            latitude: number;
            longitude: number;
}
function OrpahangesMap(){
  
  const [Orphanages, SetOrphanages] = useState<Orphanage[]>([])

useEffect(()=>{
  api.get('orphanages').then(response=>{
    SetOrphanages(response.data);
  })
}, []);


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
                center={[-23.7215727,-45.440392]} 
                zoom={16} 
                style={{ width: '100%'}}
               
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                {Orphanages.map((orphanage)=>{
                  return(
                  <Marker key={orphanage.id} icon={happyMapIcon} position={[orphanage.latitude,orphanage.longitude]} >
                  <Popup closeButton={false} minWidth={248} maxWidth={248} className="map-popup"  style={{background: 'blue'}}>
                    <Link to={`orphanage/${orphanage.id}`} >
                      {orphanage.name}
                      <FiArrowRight color="#FFF" className="ArrowIcon"/>
                      </Link>
                    </Popup>
                  </Marker>)
                })}
               </Map>
   
             </div>

    <Link to="orphanage/create" className="create-orphanage">
        <FiPlus size={32} color="#FFF"/>
    </Link>
    </div>

);
}

export default OrpahangesMap;