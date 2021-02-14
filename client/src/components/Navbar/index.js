import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAppContext } from '../../store';
import { useLoginCheck, logout } from '../../utils/setAuthToken';

import './style.css';

function Navbar() {
    const history = useHistory();
    const [authState, dispatch] = useAppContext();

    useLoginCheck(dispatch);

    const handleLogOut = (e) => {
        e.preventDefault();
        logout(dispatch);
        history.push('/');
    };

    const loginRegLink = (
        <ul className="navbar-nav list-group list-group-horizontal">
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link className="btn btn-sm active" to="/register">
                    Register
                </Link>
            </li>
        </ul>
    );

    const adminLink = (
        <ul className="navbar-nav list-group list-group-horizontal">
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/">
                    Home
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/jointeam">
                    Join
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/managegames">
                    Manage Games
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/createteam">
                    Create Team
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/profile">
                    Profile
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/standings">
                    Standings
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/votingames">
                    Vote
                </Link>
            </li>
            <li>
                <button
                    className="btn btn-sm active"
                    id="logoutBtn"
                    data-toggle="modal"
                    data-target="#logoutModal"
                    onClick={handleLogOut}
                >
                    <div>Logout</div>
                </button>
            </li>
        </ul>
    );

    const userLink = (
        
        <ul className="nav navbar-nav navbar-right list-group list-group-horizontal">
            {/* <li  class="dropdown">
                <a class="dropdown-toggle" data-toggle="dropdown" href="#">Go<span class="caret"></span></a>
            <ul className="dropdown-menu navbar-nav">
                <li>
                    <Link className="mb-1 mr-1 btn btn-sm active" to="/">
                        Home
                    </Link>
                </li>
                <li>
                    <Link className="mb-1 mr-1 btn btn-sm active" to="/profile">
                        Profile
                    </Link>
                </li>
            </ul>
            </li> */}
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/jointeam">
                    Join
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/standings">
                    Standings
                </Link>
            </li>
            <li>
                <Link className="mb-1 mr-1 btn btn-sm active" to="/votingames">
                    Vote
                </Link>
            </li>
            <li>
                <button
                    className="btn btn-sm active"
                    id="logoutBtn"
                    data-toggle="modal"
                    data-target="#logoutModal"
                    onClick={handleLogOut}
                >
                    <div>Logout</div>
                </button>
            </li>
        </ul>
    );

    return (
        <nav className="navbar navbar-inverse" style={{paddingLeft: '8px', padding: '8px'}}>
            <div className="container-fluid" style={{paddingLeft: '0px', padding: '0px'}} id="navbar1">
                <a class="navbar-brand" href="#" style={{color: 'black', paddingLeft: '0px'}}>POTM</a>
                {!authState.isAuthenticated ? loginRegLink : (authState.user.teamAdmin ? adminLink : userLink)}
            </div>
        </nav>
    );

}

export default Navbar;
