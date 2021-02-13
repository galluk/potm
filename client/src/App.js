import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Landing from './components/pages/Landing/Landing';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Dashboard from './components/pages/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import ManageGames from './components/pages/ManageGames';
import CreateTeam from './components/pages/CreateTeam';
import VotingGames from './components/pages/VotingGames';
import JoinTeam from './components/pages/JoinTeam';
import TallyBoard from './components/pages/Tallyboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppContextProvider } from './store';
import Auth from './Auth';

import './App.css';

function App() {
    return (
        <AppContextProvider>
            <Router>
                <div className="pl-0 pr-0 m-0 container-fluid" style={{backgroundColor: "#fdfffd"}}>
                    <Navbar />
                    <Route exact path="/" component={Landing} />
                    <div className="p-0 m-0 container-fluid">
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/createteam" component={CreateTeam} />
                        <Route exact path="/managegames" component={ManageGames} />
                        <Route exact path="/votingames" component={VotingGames} />
                        <Route exact path="/jointeam" component={JoinTeam} />
                        <Route exact path="/standings" component={TallyBoard} />
                        <Route exact path="/profile" component={Profile} />
                        {/* <Route exact path="/dashboard" component={Auth(Dashboard)} /> */}
                        {/* <Route exact path="/other" component={Other} /> */}
                    </div>
                </div>
            </Router>
        </AppContextProvider>
    );
}

export default App;
