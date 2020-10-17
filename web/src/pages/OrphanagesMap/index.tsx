import React from 'react';
import {Link} from 'react-router-dom';

import MapMarker from '../../images/LogoIcon.svg';
import {FiPlus} from 'react-icons/fi'

import './styles.css';

import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

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

    <div>
        <Map 
        center={[-122.4241, -45.4215668]}
        zoom={15}
        style={{width: '100vw', height: '100vw'}}
        >
         <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/y/-23.7215727/@2x?access_token=pk.eyJ1IjoiZGV2ZmlndWVpcmVkbyIsImEiOiJja2c3N25mMWIwNG1oMnRrY2ltbm9rY3JpIn0.NgfeFvlASZytFyW2LoglCg`} />
         {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}

         </Map>        
             </div>

    <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF"/>
    </Link>
    </div>

);
}

export default OrpahangesMap;