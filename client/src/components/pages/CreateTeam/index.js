import React, { useState } from "react";
import Jumbotron from "../../Jumbotron";
import { Col, Row, Container } from "../../Grid";
import { Input, FormBtn, Select } from "../../Form";
import { createTeam } from '../../../utils/userFunctions';

function CreateTeam() {
  const seasons = [{ _id: '60135ba0918ca55700d3e408', name: 'Winter 2021' }]
  const [teamName, setTeamName] = useState('')
  const [teamId, setTeamId] = useState('')
  const [seasonId, setSeasonId] = useState(seasons[0]._id)
  const [showMessage, setShowMessage] = useState(false)


  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    setTeamName(event.target.value)
  };

  function handleSelectChange(event) {
    setSeasonId(event.target.value)
  };

  function afterTeamCreated(teamData) {
    console.log(teamData);
    setTeamId(teamData._id);
    setShowMessage(true);
  }

  // When the form is submitted, use the API to add the team
  function handleFormSubmit(event) {
    event.preventDefault();
    createTeam({ seasonId: seasonId, name: teamName })
        .then(res => afterTeamCreated(res.data))
        .catch(err => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-12 sm-12">
          <Jumbotron>
            <h1>Create Your Team!</h1>
            <h5>Select a season, enter a name and you're all set</h5>
          </Jumbotron>
          <form>
            <div>
            <label>Select Season: </label>
            <Select
              onChange={handleSelectChange}
              name="seasonName"
              placeholder="Select season">
              <option value={seasons[0]._id} defaultValue>{seasons[0].name}</option>
            </Select>
            </div>
            <Input
              onChange={handleInputChange}
              name="teamName"
              placeholder="Team Name (at least 4 characters)"
            />
            <FormBtn
              disabled={(teamName.length < 4) && !(seasonId === '')}
              onClick={handleFormSubmit}
            >
              Create
            </FormBtn>
          </form>
          <div>
              {showMessage && <p>Team Created. Please send the following TeamId to your players: {teamId}</p> }
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateTeam;