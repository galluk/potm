import React, { useState } from "react";
import Jumbotron from "../../Jumbotron";
import { Col, Row, Container } from "../../Grid";
import AddGame from "../../AddGame";
import Games from "../../Games";
import Button from 'react-bootstrap/Button';
// import 'bootstrap/dist/css/bootstrap.min.css';

function ManageGames(props) {
    // const [games, setGames] = useState([])
    const [games, setGames] = useState([{ _id: '123456', round: 1, gameDate: '20201-02-18', opposition: 'the enemy', votingOpen: false }])

    const [showAddGame, setShowAddGame] = useState(false)

    // // import csv file of games
    function importGames() {
        // show import form
        alert('Show import games form...')
    }

    // // delete selected game
    function deleteGame(gameId) {
        // delete the game from the db

        // update state
        setGames(games.filter((game) => game._id !== gameId))
    }

    // // edit selected game
    function editGame(gameId) {
        setShowAddGame(!showAddGame)
    }

    function openVoting(gameId) {
        // update the DB
        
        setGames(games.map((game) =>
            game._id === gameId ? { ...game, votingOpen: !game.votingOpen } : game)
        )
    }

    // // add new game
    function addGame(game) {
        const newGame = { _id: '987654', ...game }
        setGames([...games, newGame])
        console.log('adding game');
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
                        <h3>Add, edit, delete or import games for your team.</h3>
                    </Jumbotron>
                </Col>
            </Row>
            <Row>
                <Col size="md-3 sm-2">
                </Col>
                <Col size="md-6 sm-8">
                    <div>
                        <Button variant="outline-primary" className="float-right" onClick={() => importGames()}>Import</Button>
                        <Button color={showAddGame ? 'red' : 'green'} text={showAddGame ? 'Close' : 'Add'} onClick={showGameForm}>Add</Button>
                    </div>
                    <div>
                        {showAddGame && <AddGame onAdd={addGame} />}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col size="md-3 sm-2">
                </Col>
                <Col size="md-6 sm-62">
                    <div>
                        {games.length ? (
                            <Games games={games} onDelete={deleteGame} onEdit={editGame} onOpenVoting={openVoting} />
                        ) : (
                                <h5>There are no games associated with this team.</h5>
                            )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ManageGames;