import axios from 'axios';
const mongoose = require('mongoose');

export const getMongooseId = (idString) => {
    return mongoose.Types.ObjectId(idString)
}

export const registerUser = (userData) => {
    // console.log(userData);
    return axios.post('/api/register', {
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,
    });
};

export const loginUser = (userData) => {
    // console.log(userData);
    return axios.post('/api/login', {
        email: userData.email,
        password: userData.password,
    });
};

export const getUsers = () => {
    return axios.get('/api/displayusers').then((res) => res.data);
};

// get games for the given teamId
export const getTeamGames = (id) => {
        return axios.get('/api/games/team/' + id);
};

// add a new game
export const addGame = (game) => {
    return axios.post('/api/games/', game);
};

// add a new game
export const deleteGame = (id) => {
    return axios.delete('/api/games/' + id);
};

// update a game
export const updateGame = (game) => {
    return axios.put('/api/games/', game);
};
