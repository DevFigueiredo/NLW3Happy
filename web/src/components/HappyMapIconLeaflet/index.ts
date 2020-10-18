import MapMarker from '../../images/LogoIcon.svg';
import L from 'leaflet';

const happyMapIcon = L.icon({
    iconUrl: MapMarker,
  
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [180, -7]
  });

  export default happyMapIcon;