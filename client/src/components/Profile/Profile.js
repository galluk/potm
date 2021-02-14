import React from 'react';
import { useAppContext } from '../../store';
import { useLoginCheck } from '../../utils/setAuthToken';
import Jumbotron from "../Jumbotron";
import { Col, Row, Container } from "../Grid";

function Profile() {
    const [authState, appDispatch] = useAppContext();

    useLoginCheck(appDispatch);

    // get a list of the user's teams

    return (
        <Container fluid>
        <Row>
            <Col size="md-12 sm-12">
                <Jumbotron>
                    <h1>Profile</h1>
                    <h5>About you...</h5>
                </Jumbotron>
            </Col>
        </Row>
        <Row>
            <Col size="md-2 sm-0"></Col>
            <Col size="md-8 sm-12">
                    <table className="table mx-auto col-md-6" style={{color: "#111111"}}>
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>{authState.user.fullName}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{authState.user.email}</td>
                            </tr>
                            <tr>
                                <td>Team Admin</td>
                                <td>{authState.user.teamAdmin ? 'Yes' : 'No'}</td>
                            </tr>
                        </tbody>
                    </table>
                </Col>
            <Col size="md-2 sm-0"></Col>
        </Row>   
    </Container>
    );
}

export default Profile;
