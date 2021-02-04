import React, { useState } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Link } from "react-router-dom";
// import { Input, FormBtn } from "../components/Form";

// props has an array of games the user can vote on, userId
function VotingGames(props) {
    const [games, setGames] = useState([])

    return (
        setGames(props),
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
          {games.length ? (
              <List>
                {games.map(game => (
                  <ListItem key={game._id}>
                    <Link to={"/gamevote/" + game._id}>
                      <strong>
                        Round {game.round} on {game.date} v {game.opposition}
                      </strong>
                    </Link>
                  </ListItem>
                ))}
              </List>
          ) : (
            <h3>You have no games currently open for voting.</h3>
          )}
          </Row>   
      </Container>
      );
    }
    
    export default VotingGames;