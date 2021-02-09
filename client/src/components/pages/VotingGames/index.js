import React, { useState, useEffect } from "react";
import Jumbotron from "../../Jumbotron";
import EnterVotes from "../../EnterVotes";
import { useAppContext } from '../../../store';
import { Col, Row, Container } from "../../Grid";
import { List, ListItem } from "../../List";
import { FaVoteYea } from 'react-icons/fa'
import { getUserVotingGames } from '../../../utils/userFunctions';
// import { Input, FormBtn } from "../components/Form";

// props has an array of games the user can vote on, userId
function VotingGames(props) {
  const [games, setGames] = useState([])
  const [authState] = useAppContext();

  const [showGameVotes, setShowGameVotes] = useState(false)
  const [selectedGame, setSelectedGame] = useState({})

  // Load all games available fo voting and store them with setgames
  useEffect(() => {
    loadVotingGames()
  }, [])

  function loadVotingGames() {
      getUserVotingGames(authState.user._id)
          .then(res => {
            console.log('back from getUserVotingGames ----------------------------------------');
            console.log(res);
            (res.data) ? setGames(res.data) : setGames([])
          }
          )
          // .then(res => setGames([]))
          .catch(err => console.log(err));
  }


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
                        Round {game.round} on {game.gameDate.slice(0, 10)} v {game.opposition}
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