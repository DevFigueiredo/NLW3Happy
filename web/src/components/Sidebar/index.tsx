import React from 'react';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../../images/LogoIcon.svg';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

export default function Sidebar() {
  const { goBack } = useHistory();
   
    return(     
    <div id="page-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
     </div>
    );
    
}

