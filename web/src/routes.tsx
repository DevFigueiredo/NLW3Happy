import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './pages/Landing'
import CreateOrphanage from './pages/CreateOrphanage';
import Orphanage from './pages/Orphanage';
import OrphanagesMap from './pages/OrphanagesMap';

function Routes(){
    return(
   <BrowserRouter>
 {/* Switch Deixa apenas uma rota ser carregada */}
   <Switch>
   <Route path="/" exact component={Landing}/>
   <Route path="/app" component={OrphanagesMap}/>
   <Route path="/orphanage/create" component={CreateOrphanage}/>
   <Route path="/orphanage/:id" component={Orphanage}/>
   </Switch>
   </BrowserRouter>

    );
}

export default Routes;