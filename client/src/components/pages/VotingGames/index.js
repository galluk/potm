import React, { useState } from "react";
import Jumbotron from "../../Jumbotron";
import EnterVotes from "../../EnterVotes";
import { Col, Row, Container } from "../../Grid";
import { List, ListItem } from "../../List";
import { FaVoteYea } from 'react-icons/fa'
// import { Input, FormBtn } from "../components/Form";

// props has an array of games the user can vote on, userId
function VotingGames(props) {
  // const [games, setGames] = useState([])
  const [games, setGames] = useState([
    { _id : '6013e37ee19f703c1881fe1b', teamId : '601367a7f8efe351e0cb8081', gameDate : "2021-01-29T10:29:18.289+00:00", round : 1, opposition : "The Bad guys"}])

  const [showGameVotes, setShowGameVotes] = useState(false)
  const [selectedGame, setSelectedGame] = useState({})

    // show/hide  the game form based on current show
  function showGameVoteForm(game) {
    setSelectedGame(game)
    setShowGameVotes(true)
  }

  function doEnterVotes(gameVotes) {
    setShowGameVotes(false)
    alert('votes have been entered! ' + JSON.stringify(gameVotes))
  }

return (
    <Container fluid>
      <Row>
        <Col size="md-10 sm-12">
          <Jumbotron>
            <h1>Enter Votes</h1>
            <h3>Select game and enter votes</h3>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-10 sm-12">
        <div>
          {showGameVotes && <EnterVotes game={selectedGame} onEnterVotes={doEnterVotes} />}
        </div>
        </Col>
      </Row>
      <Row>
          {games.length ? (
              <List>
                {games.map(game => (
                  <ListItem key={game._id}>
                      <strong>
                        Round {game.round} on {game.date} v {game.opposition}
                      </strong>
                      <FaVoteYea
                        style={{color: 'purple', cursor: 'pointer', fontSize: '36px' }}
                        title={'Vote' }
                        onClick={() => showGameVoteForm(game)}
                      />
                  </ListItem>
                ))}
              </List>
          ) : (
            <h3>You don't have any games currently open for voting.</h3>
          )}
          </Row>   
    </Container>
  );
}

export default VotingGames;