import React, { useState } from "react";
import { useAppContext } from '../../../store';
import Jumbotron from "../../Jumbotron";
import { Col, Row, Container } from "../../Grid";
import { Input, FormBtn } from "../../Form";
import { addPlayer } from '../../../utils/userFunctions';

function JoinTeam() {
    const [teamId, setTeamId] = useState('')
    const [authState] = useAppContext();

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setTeamId(value)
    };

    // When the form is submitted, use the API to add the user as a player to the given team
    function handleFormSubmit(event) {
        event.preventDefault();
        let newPlayer = {userId: authState.user._id, teamId: teamId}
        console.log(newPlayer);
        addPlayer(newPlayer)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    };

    return (
        <Container fluid>
          <Row>
            <Col size="md-10 sm-12">
              <Jumbotron>
                <h1>Join Your Team!</h1>
                <h3>Enter the provided TeamId to join up...</h3>
              </Jumbotron>
              <form>
                <Input
                  onChange={handleInputChange}
                  name="teamId"
                  placeholder="Team Id"
                />
                <FormBtn
                  disabled={!(teamId.length === 24)}
                  onClick={handleFormSubmit}
                >
                  Join
                </FormBtn>
              </form>
            </Col> 
          </Row>    
      </Container>
      );
    }
    
    export default JoinTeam;