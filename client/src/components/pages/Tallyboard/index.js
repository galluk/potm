import React, { useState, useEffect } from "react";
import Jumbotron from "../../Jumbotron";
import { useAppContext } from '../../../store';
import { Col, Row, Container } from "../../Grid";
import { List, ListItem } from "../../List";
import { getGameVotesByteam, getPlayersInTeam } from '../../../utils/userFunctions';

function TallyBoard() {
    const [players, setPlayers] = useState([])
    let playerVotes = [];
    let tmpPlayers = [];
    const teamId = '601367a7f8efe351e0cb8081'

  // Load all games available fo voting and store them with setgames
  useEffect(() => {
    loadPlayersInTeam()
  }, [])

  function loadPlayersInTeam() {
    getPlayersInTeam(teamId)
        .then(res => {
            let playerList = res.data;
            tmpPlayers = playerList.map(p  => { return {...p, totalVotes: 0 } }); 
            loadVotesForTeam();
        })
        .catch(err => console.log(err));
  }

    function loadVotesForTeam() {
        getGameVotesByteam(teamId)
            .then(res => {
                playerVotes = (res.data);
                tallyVotes();
            })
            .catch(err => console.log(err));
    }

    function tallyVotes() {
        playerVotes.forEach(vote => {
            // find the player in the tmp array that these votes belong to
            const votedPlayer = tmpPlayers.find( ({ playerId }) => playerId.toString() === vote.votedPlayerId )
            if (votedPlayer) {
                votedPlayer.totalVotes += vote.points
            }
        })
        tmpPlayers.sort((a, b) => b.totalVotes - a.totalVotes);
        // set the Player state now so that it only refreshes once
        setPlayers(tmpPlayers);
    }
    
return (
    <Container fluid>
        <Row>
            <Col size="md-12 sm-12">
                <Jumbotron>
                    <h1>Current Standings</h1>
                    <h4>Here's how the votes have gone so far...</h4>
                </Jumbotron>
            </Col>
        </Row>
        <Row>
            <Col size="md-2 sm-0"></Col>
            <Col size="md-8 sm-12">
                {players.length ? (
                    <List size="md-12 sm-12" style={{alignItems:'center'}}>
                    {players.map((player, index) => (
                        <ListItem key={index}>
                            <strong>
                                {player.firstName} {player.lastName} {player.totalVotes} 
                            </strong>
                        </ListItem>
                    ))}
                    </List>
                ) : (
                <h3>There are no players currently in this team.</h3>
                )}
            </Col>
            <Col size="md-2 sm-0"></Col>
        </Row>   
    </Container>
    );
}
    
    export default TallyBoard;