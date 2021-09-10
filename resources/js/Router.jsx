import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//pages
import Home from './pages/Home';
import Pessoas from './pages/Pessoas';
import Vagas from './pages/Vagas';
import Candidaturas from './pages/Candidaturas';

//nav menu
import NavMenu from './components/NavMenu';

export default class App extends React.Component {

  render() {
    return (
      <div className="App">
        
      <BrowserRouter>

        <NavMenu />
        <Switch>
          <Route path="/" exact={true} component={Home} />
          <Route path="/Pessoas" exact={true} component={Pessoas} />
          <Route path="/Vagas" exact={true} component={Vagas} />
          <Route path="/Candidaturas" exact={true} component={Candidaturas} />
        </Switch>

      </BrowserRouter>      
    </div>
      );
    }
}