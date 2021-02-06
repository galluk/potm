import React, { useState } from "react";
import Jumbotron from "../../Jumbotron";
import { Col, Row, Container } from "../../Grid";
import { Input, FormBtn } from "../../Form";

function JoinTeam() {
    const [user, setUser] = useState([])
    const [formObject, setFormObject] = useState({})

    // Handles updating component state when the user types into the input field
    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormObject({ ...formObject, [name]: value })
    };

    // When the form is submitted, use the API to add the user as a player to the given team
    function handleFormSubmit(event) {
        event.preventDefault();
        // if (formObject.title) {
            // API.searchBooks(formObject.title)
            //     .then(res => displayResults(res.data.items))
            //     .catch(err => console.log(err));
        // }
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
                  disabled={!(formObject.title)}
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