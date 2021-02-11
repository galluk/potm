import React, { useState, useEffect } from "react";
import Jumbotron from "../../Jumbotron";
import EnterVotes from "../../EnterVotes";
import { useAppContext } from '../../../store';
import { Col, Row, Container } from "../../Grid";
import { List, ListItem } from "../../List";
import { FaVoteYea } from 'react-icons/fa'
import { getUserVotingGames, getPlayersInTeam } from '../../../utils/userFunctions';
// import { Input, FormBtn } from "../components/Form";

function VotingGames(props) {
  const [games, setGames] = useState([])
  const [authState] = useAppContext();

  const [showGameVotes, setShowGameVotes] = useState(false)
  const [selectedGame, setSelectedGame] = useState({})
  const [gamePlayers, setGamePlayers] = useState([])

  // Load all games available fo voting and store them with setgames
  useEffect(() => {
    loadVotingGames()
  }, [])

  function loadVotingGames() {
      getUserVotingGames(authState.user._id)
          .then(res => setGames(res.data))
          .catch(err => console.log(err));
  }


  // show/hide  the game form based on current show
  function showGameVoteForm(event, game) {
    event.preventDefault();
    setSelectedGame(game)
    // get the players who are in this team
    getPlayersInTeam(selectedGame.teamId)
      .then(res => { 
         setGamePlayers(res.data)
         setShowGameVotes(true)
      })
      .catch(err => console.log(err));
    
  }

  function doEnterVotes(gameVotes) {
    setShowGameVotes(false)
    alert('votes have been entered! ' + JSON.stringify(gameVotes))
  }

return (
    <Container fluid>
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Enter Votes</h1>
            <h4>Select game and enter votes</h4>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col size="md-12 sm-12">
        <div>
          {showGameVotes && <EnterVotes game={selectedGame} players={gamePlayers} onEnterVotes={doEnterVotes} />}
        </div>
        </Col>
      </Row>
      <Row>
        <Col size="md-2 sm-2"></Col>
        <Col size="md-8 sm-8">
          {games.length ? (
              <List size="md-12 sm-12" style={{alignItems:'center'}}>
                {games.map(game => (
                  <ListItem key={game._id}>
                      <strong>
                        Round {game.round} on {game.gameDate.slice(0, 10)} v {game.opposition}
                      </strong>
                      <FaVoteYea
                        className='float-right' 
                        style={{color: 'purple', cursor: 'pointer', fontSize: '36px' }}
                        title={'Vote'}
                        onClick={(e) => showGameVoteForm(e, game)}
                      />
                  </ListItem>
                ))}
              </List>
          ) : (
            <h3>You don't have any games currently open for voting.</h3>
          )}
          </Col>
          <Col size="md-2 sm-2"></Col>
        </Row>   
    </Container>
  );
}

export default VotingGames;