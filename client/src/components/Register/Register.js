import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser, getUsers } from '../../utils/userFunctions';
import { checkFormFields } from './checkFormFields';

function Register(props) {
    const history = useHistory();

    const [registerState, setRegisterState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        teamAdmin: false,
        errors: {},
        formIsValid: true,
    });

    const handleValidation = () => {
        const [errors, formIsValid] = checkFormFields(registerState);
        setRegisterState({ ...registerState, errors, formIsValid });
    };

    const onChange = (event) => {
        setRegisterState({ ...registerState, [event.target.name]: event.target.value });
    };

    const onSubmit = (event) => {
        let errors = {};
        handleValidation();
        event.preventDefault();
        const userData = {
            firstName: registerState.firstName,
            lastName: registerState.lastName,
            email: registerState.email,
            password: registerState.password,
            teamAdmin: registerState.teamAdmin,
        };
        if (registerState.formIsValid) {
            getUsers().then((data) => {
                console.log(data);
                var alreadyRegisteredUser = data
                    .find((element) => element.email === registerState.email)
                if (!alreadyRegisteredUser) {
                    registerUser(userData).then((res) => {
                        history.push('/login');
                    });
                    console.log('Form submitted');
                } else {
                    errors['email'] = 'Email already exists';
                    setRegisterState({ ...registerState, errors });
                }
            });
        } else {
            console.log('Form has errors.');
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="mx-auto mt-5 col-md-6">
                    <form noValidate onSubmit={onSubmit}>
                        <h1 className="mb-3 h3 font-weight normal">Please Sign in</h1>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                refs="firstName"
                                className="form-control"
                                name="firstName"
                                placeholder="Enter First Name"
                                value={registerState.firstName}
                                onChange={onChange}
                            />
                            <span style={{ color: 'red' }}>{registerState.errors['firstName']}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                refs="lastName"
                                className="form-control"
                                name="lastName"
                                placeholder="Enter Last Name"
                                value={registerState.lastName}
                                onChange={onChange}
                            />
                            <span style={{ color: 'red' }}>{registerState.errors['lastName']}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <input
                                type="email"
                                refs="email"
                                className="form-control"
                                name="email"
                                placeholder="Enter Email"
                                value={registerState.email}
                                onChange={onChange}
                            />
                            <span style={{ color: 'red' }}>{registerState.errors['email']}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                refs="password"
                                className="form-control"
                                name="password"
                                placeholder="Enter Password"
                                value={registerState.password}
                                onChange={onChange}
                            />
                            <span style={{ color: 'red' }}>{registerState.errors['password']}</span>
                        </div>
                        <div className="form-group">
                            <label htmlFor="teamAdmin">Team Admin</label>
                            <input
                                type="checkbox"
                                refs="teamAdmin"
                                className="form-control"
                                name="teamAdmin"
                                // placeholder="Enter Password"
                                value={registerState.teamAdmin}
                                onChange={onChange}
                            />
                            <span style={{ color: 'red' }}>{registerState.errors['teamAdmin']}</span>
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
