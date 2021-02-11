import React, { useEffect } from "react";
import { Col, Row, Container } from "../Grid";
import { List, ListItem } from "../List";
import { FormBtn } from "../Form";

function EnterVotes({ game, players, onEnterVotes}) {

    const playerVotes = [];

    useEffect(() => {
        // load an array to store all the values
        players.forEach(player => 
            playerVotes.push({ playerId: '', votedPlayerId: player.playerId, points: 0 })
        )
      }, [])
      
    function doVoteChange(e) {
        let arrayIndex = e.target.name;
        playerVotes[arrayIndex].points = parseInt(e.target.value);
        console.log(playerVotes);
    }

    // When the form is submitted, use the API to add the players votes
    function handleFormSubmit(event) {
        event.preventDefault();

        console.log(playerVotes);
        // check that only 6 points are being given
        let totalVotes = playerVotes.reduce(function (accumulator, vote) {
            return accumulator + vote.points
          }, 0);

        if (totalVotes !== 6) {
            //don't enter votes and show warning message
            alert('The total points given for a game must = 6')
        }
        else {

        // send the votes back to calling page
        onEnterVotes([{playerId: '123456', votes: 2}])
        // if (formObject.title) {
        // API.searchBooks(formObject.title)
        //     .then(res => displayResults(res.data.items))
        //     .catch(err => console.log(err));
        // }
        }
    };

    return (
        <Container fluid>
            <Row>
                <Col size="md-12 sm-12">
                    <h5>Enter 3-2-1 for the game against {game.opposition}</h5>
                </Col>
            </Row>
            <Row>
                <Col size="md-3 sm-12">
                </Col>
                <Col size="md-6 sm-12">
                    {players.length ? (
                        <List>
                            <form>
                                {players.map((player, index) =>
                                    // <ListItem key={player._id}>
                                    <ListItem key={index}>
                                        <div>
                                        <label>{player.firstName} {player.lastName}</label>
                                        <select style = {{'float': 'right'}} name={index} onChange={doVoteChange}>
                                            <option value="" defaultValue></option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                        </div>
                                    </ListItem>
                                )}
                                <div>
                                    <label visible='true'>Total votes must add up to 6.</label>
                                </div>
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