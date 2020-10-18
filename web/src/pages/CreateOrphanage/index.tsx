import React, { useState, FormEvent, ChangeEvent } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import L from 'leaflet';

import { FiPlus } from "react-icons/fi";

import mapMarkerImg from '../../images/LogoIcon.svg';


import './styles.css';
import Sidebar from "../../components/Sidebar";
import happyMapIcon from "../../components/HappyMapIconLeaflet";
import api from "../../services/api";
import { useHistory } from "react-router";


export default function CreateOrphanage() {
  const history = useHistory();
  const [name, setName]= useState("");
  const [about, setAbout]= useState("");
  const [instructions, setInstructions]= useState(""); 
  const [opening_hours, setOpening_hours]= useState("");
  const [open_on_weekends, setOpen_on_weekends]= useState(true);
  const [PositionMap, SetPositionMap] = useState({latitude: 0, longitude: 0})
  const [images, SetImages] = useState<File[]>([])
   function handleMapClick(event: L.LeafletMouseEvent){
    const {lat, lng} = event.latlng;
    SetPositionMap({latitude: lat, longitude: lng});
    }


    async function CreateOrphanageSubmit(event: FormEvent){
    event.preventDefault();
    const OrphanageData = new FormData();
    const {latitude, longitude} = PositionMap; 
      OrphanageData.append('name',name)
      OrphanageData.append('about',about)
      OrphanageData.append('instructions',instructions)
      OrphanageData.append('opening_hours',opening_hours)
      OrphanageData.append('open_on_weekends',String(open_on_weekends))
      OrphanageData.append('latitude',String(latitude))
      OrphanageData.append('longitude',String(longitude))
      images.forEach(image=>{
      OrphanageData.append('images', image)
      })
      
     const responseSubmit = await api.post("/orphanages",OrphanageData)
      
     if(responseSubmit.status==201){
       history.push('/app'); 
     }

    }

function handleSelectImages(event: ChangeEvent<HTMLInputElement>){
  console.log(event.target.files);
  
   if(!event.target.files)
   return null

   SetImages(Array.from(event.target.files));
}

  return (
    <div id="page-create-orphanage">
        <Sidebar/>


      <main>
        <form className="create-orphanage-form" onSubmit={CreateOrphanageSubmit}>
          <fieldset>
            <legend>Dados</legend>


            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={event=>{setName(event.target.value)}}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={event=>{setAbout(event.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
              {images.map((image, index)=>{
                return(
               <img key={index} src={URL.createObjectURL(image)} alt={name} />
                 
                );
              })}
              <label htmlFor="image[]" className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              </div>
              
              <input type="file" accept="image/png, image/jpeg"  multiple onChange={handleSelectImages} id="image[]"/>

            </div>
          </fieldset>
          

          <fieldset>
            <legend>Visitação</legend>

            <Map 
              center={[-23.7215727,-45.440392]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {PositionMap.latitude!=0 && PositionMap.longitude && (
              <Marker 
              interactive={false} 
              icon={happyMapIcon} 
              position={[PositionMap.latitude,PositionMap.longitude]} />
              )
              }
            </Map>
            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={event=>{setInstructions(event.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input id="opening_hours"  value={opening_hours} onChange={event=>{setOpening_hours(event.target.value)}} />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends===true ?"active": ""} onClick={()=>setOpen_on_weekends(true)}>Sim</button>
                <button type="button" className={open_on_weekends===false ?"active": ""} onClick={()=>setOpen_on_weekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
