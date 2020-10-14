import React from 'react';

import './styles.css';
import LogoImg from '../../images/Logoname.svg';
import {FiArrowRight} from 'react-icons/fi';

import { Link } from 'react-router-dom';

function Landing(){
return(

     
    <div id="page-landing">
    <div className="content-wrapper">
      <img src={LogoImg} alt="Happy"/> 
    <main>
      <div className="text-message">
      <h1>Leve felicidade para o mundo</h1>
      <p>Visite orfanatos e mude o dia de muitas crianças.</p>
      </div>
  
    <div className="location">
      <strong>Rio do Sul</strong>
      <span>Caraguatatuba - SP</span>
    </div>

    
    <Link to="/app" className="enter-app"><FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" /></Link>


    </main>
    </div>
  </div>

);
}

export default Landing;