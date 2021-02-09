import React, { useState } from "react";
import Jumbotron from "../../Jumbotron";
import { Col, Row, Container } from "../../Grid";
import { Input, FormBtn } from "../../Form";
import { createTeam } from '../../../utils/userFunctions';

function CreateTeam() {
  const seasons = [{ _id: '60135ba0918ca55700d3e408', name: 'Winter 2021' }]
  const [teamName, setTeamName] = useState('')
  const [seasonId, setSeasonId] = useState(seasons[0]._id)


  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setTeamName(value)
  };

  function handleSelectChange(event) {
    const { name, value } = event.target;
    setSeasonId(value)
  };

  // When the form is submitted, use the API to add the team
  function handleFormSubmit(event) {
    event.preventDefault();
    createTeam({ seasonId: seasonId, teamName: teamName })
        .then(res => console.log(res.data))
        .catch(err => console.log(err));
  };

  return (
    <Container fluid>
      <Row>
        <Col size="md-10 sm-12">
          <Jumbotron>
            <h1>Create Your Team!</h1>
            <h3>Select a season you're all set</h3>
          </Jumbotron>
          <form>
            <div>
            <label>Select Season: </label>
            <select
              onChange={handleSelectChange}
              name="seasonName"
              placeholder="Select season">
              <option value={seasons[0]._id} defaultValue>{seasons[0].name}</option>
            </select>
            </div>
            <Input
              onChange={handleInputChange}
              name="teamName"
              placeholder="Team Name"
            />
            <FormBtn
              disabled={!(teamName) && !seasonId}
              onClick={handleFormSubmit}
            >
              Create
            </FormBtn>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default CreateTeam;