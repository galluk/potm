import React, { useState } from "react";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { Input, FormBtn } from "../Form";

// props has game id, playerid of the player casting votes and an array of players in the team
function EnterVotes({ game, onEnterVotes}) {
    // const [players, setPlayers] = useState([])
    const players = [{ firstName: "Player1" }, { firstName: "Player2" }, { firstName: "Player3" }, { firstName: "Player4" }]

    // When the form is submitted, use the API to add the players votes
    function handleFormSubmit(event) {
        event.preventDefault();

        // check that only 6 points are being given


        // send the votes back to calling page
        onEnterVotes([{playerId: '123456', votes: 2}])
        // if (formObject.title) {
        // API.searchBooks(formObject.title)
        //     .then(res => displayResults(res.data.items))
        //     .catch(err => console.log(err));
        // }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-12 sm-12">
                    <h3>Enter 3-2-1 for the desired players</h3>
                </Col>
            </Row>
            <Row>
                <Col size="md-3 sm-12">
                </Col>
                <Col size="md-6 sm-12">
                    {players.length ? (
                        <List>
                            <form>
                                {players.map(player => (
                                    // <ListItem key={player._id}>
                                    <ListItem key={player.firstName}>
                                        <div>
                                        <label>{player.firstName}</label>
                                        <select style = {{'float': 'right'}}>
                                            <option value="" defaultValue></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        </div>
                                    </ListItem>
                                ))}
                                <FormBtn onClick={handleFormSubmit}>Vote</FormBtn>
                                {/* <FormBtn onClick={() => onEnterVotes([{playerId: '123456', votes: 2}])}>Vote</FormBtn> */}
                            </form>
                        </List>
                    ) : (
                            <h5>There are no players listed in this team.</h5>
                        )}
                </Col>
            </Row>
        </Container>
    );
}

export default EnterVotes;