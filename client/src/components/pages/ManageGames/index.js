import React, { useState, useEffect } from 'react';
import Jumbotron from "../../Jumbotron";
import { getTeamGames, addGame, deleteGame, updateGame, importGames } from '../../../utils/userFunctions';
import { List, ListItem } from "../../List";
import AddGame from "../../AddGame";
import ImportGames from "../../ImportGames";
import Game from "../../Game";
import Button from 'react-bootstrap/Button';
import { Col, Row, Container } from "../../Grid";
// import 'bootstrap/dist/css/bootstrap.min.css';

function ManageGames(props) {
    const [games, setGames] = useState([])
    const [activeGame, setActiveGame] = useState({})
    const [showAddGame, setShowAddGame] = useState(false)
    const [showEditGame, setShowEditGame] = useState(false)
    const [showImportGames, setShowImportGames] = useState(false)

    const teamId = '601367a7f8efe351e0cb8081'

    // Load all games and store them with setgames
    useEffect(() => {
        loadGames()
    }, [])

    function loadGames() {
        // getTeamGames(props.teamId)
        getTeamGames(teamId)
            .then(res => setGames(res.data))
            .catch(err => console.log(err));
    }

    // import csv file of games
    function importNewGames(gameArray) {
        // create array of new objects with the team id
        const newGames = gameArray.map(game => {
            return {...game, teamId: teamId }
        })

        if (newGames.length > 0) {
            importGames(newGames)
                .then(res => loadGames())
                .catch(err => console.log(err));
        }
        setShowImportGames(false)
    }

    function showImportGamesForm() {
        setShowImportGames(true)
    }

    function onCancelImport() {
        setShowImportGames(false)
    }

    function onCancelForm() {
        setShowEditGame(false)
        setShowAddGame(false)
    }

    // // delete selected game
    function onDeleteGame(gameId) {
        console.log('deleting game: ' + gameId);

        // delete the game from the db
        deleteGame(gameId)
            .then(res => loadGames())
            .catch(err => console.log(err));
    }

    // // edit selected game
    function onEditGame(game) {
        setShowEditGame(false)
        let editedGame = { ...game, _id: activeGame._id }
        updateGame(editedGame)
            .then(res => loadGames())
            .catch(err => console.log(err));
    }

    // show/hide the game form based on current show
    function showEditGameForm(game) {
        setActiveGame(game)
        setShowEditGame(true)
    }

    function openVoting(gameId) {
        // update the DB

        setGames(games.map((game) =>
            game._id === gameId ? { ...game, votingOpen: !game.votingOpen } : game)
        )
    }

    // add new game
    function addNewGame(game) {
        const newGame = { teamId: teamId, ...game }
        console.log('adding game');
        console.log(JSON.stringify(newGame));
        addGame(newGame)
            .then(res => loadGames())
            .catch(err => console.log(err));
        setShowAddGame(false);
    }

    // show/hide  the game form based on current show
    function showGameForm() {
        setShowAddGame(!showAddGame)
    }

    return (
        <Container fluid>
            <Row>
                <Col size="md-12 sm-12">
                    <Jumbotron>
                        <h1>Manage Games</h1>
                        <h5>Add, edit, delete or import games for your team.</h5>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col size="md-1 sm-1"></Col>
                <Col size="md-10 sm-10">
                    <div style={{paddingBottom:'5px'}}>
                        <Button variant="outline-primary" className="float-right" onClick={showImportGamesForm}>Import</Button>
                        <Button color={showAddGame ? 'red' : 'green'} text={showAddGame ? 'Close' : 'Add'} onClick={showGameForm}>Add</Button>
                    </div>
                    <div>
                        {showImportGames && <ImportGames onImport={importNewGames} onCancel={onCancelImport} />}
                    </div>
                    <div>
                        {showAddGame && <AddGame game={{}} newGame={true} onAdd={addNewGame} onEdit={onEditGame} onCancel={onCancelForm} />}
                    </div>
                    <div>
                        {showEditGame && <AddGame game={activeGame} newGame={false} onEdit={onEditGame} onCancel={onCancelForm} />}
                    </div>
                </Col>
                <Col size="md-1 sm-1"></Col>
            </Row>
            <Row>
                <Col size="md-1 sm-1"></Col>
                <Col size="md-10 sm-10">
                    <div>
                        {games.length ? (
                            <List>

                                {games.map((game, index) => (
                                <ListItem key={index}>
                                    <Game key={game._id} game={game} onDelete={onDeleteGame} onEdit={showEditGameForm} onOpenVoting={openVoting} />
                                </ListItem>
                            ))}
                            </List>
                        ) : (
                                <h5>There are no games associated with this team.</h5>
                            )}
                    </div>
                </Col>
                <Col size="md-1 sm-1"></Col>
            </Row>
        </Container>
    );
}

export default ManageGames;