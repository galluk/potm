import React from 'react';
import './style.css';

function BrandDescription() {
    return (
        <div className="p-0 m-0 container-fluid d-flex justify-content-center">
            <div className="p-0 m-0 row">
                <div className="cardBackground card col-md-12 col-xs-12">
                    <div className="card-body">
                        <h5 className="card-title">About POTM</h5>
                        <p className="card-text">
                            Player Of The Match voting is designed to give you a convenient way for your team to determine who the outstanding
                            player has been for the season. Just get your team admin (or take it on yourself!) to create a team, share the Team 
                            Id with everyone else who can then register and join the team.
                        </p>
                        <p className="card-text">
                            You can even vote for yourself!
                        </p>
                        <p className="card-text">
                            Not that you would...
                        </p>
                    </div>
                </div>
                <div className="text-center cardBackground card col-md-12 col-xs-12">
                    <div className="card-body">
                        <h5 className="card-title">Follow Us!</h5>
                        <a href="/">
                            <span className="fa-stack facebookLogo">
                                <i className="far fa-circle fa-stack-2x"></i>
                                <i className="fab fa-facebook-f fa-stack-1x"></i>
                            </span>
                        </a>
                        <a href="/">
                            <span className="fa-stack twitterLogo">
                                <i className="far fa-circle fa-stack-2x"></i>
                                <i className="fab fa-twitter fa-stack-1x"></i>
                            </span>
                        </a>
                        <a href="/">
                            <span className="fa-stack instagramLogo">
                                <i className="far fa-circle fa-stack-2x"></i>
                                <i className="fab fa-instagram fa-stack-1x"></i>
                            </span>
                        </a>
                        <a href="/">
                            <span className="fa-stack linkedinLogo">
                                <i className="far fa-circle fa-stack-2x"></i>
                                <i className="fab fa-linkedin-in fa-stack-1x"></i>
                            </span>
                        </a>
                        <a href="/">
                            <span className="fa-stack googleLogo">
                                <i className="far fa-circle fa-stack-2x"></i>
                                <i className="fab fa-google fa-stack-1x"></i>
                            </span>
                        </a>
                    </div>
                </div>
                <div className="cardBackground card col-md-12 col-xs-12">
                    <div className="card-body">
                        <p className="card-text" style={{textAlign: 'center'}}>
                            You will vote for yourself, won't you?
                        </p>
                        <p className="card-text" style={{textAlign: 'center'}}>
                            But only because you know there's others in your team who will, right?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BrandDescription;
