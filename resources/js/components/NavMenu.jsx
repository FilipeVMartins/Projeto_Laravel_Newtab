import React from 'react';
import {NavLink} from 'react-router-dom';


//styles
import '../../css/components/navmenu.css';

export default class NavMenu extends React.Component {





  render() {
    return (
      <div className="nav-menu-wrapper">
        <nav className="app-nav">
            <NavLink exact to="/" activeClassName="App-link-CurrentPage" >
                <h3>Home</h3>
            </NavLink>
            <NavLink exact to="/Pessoas" activeClassName="App-link-CurrentPage" >
                <h3>Pessoas</h3>
            </NavLink>
            <NavLink exact to="/Vagas" activeClassName="App-link-CurrentPage" >
                <h3>Vagas</h3>
            </NavLink>
            <NavLink exact to="/Candidaturas" activeClassName="App-link-CurrentPage" >
                <h3>Candidaturas</h3>
            </NavLink>
        </nav>
      </div>
    );
  };
};