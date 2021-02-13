import React from 'react';

function LandingJumbo() {
    return (
        <div className="mt-4 jumbotron landingJumbo">
            <div className="mx-auto col-sm-10 jumboText">
                <h1 className="d-flex justify-content-center companyName">
                    <div className="mr-2 sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-futbol" />
                    </div>
                    <div>Player Of The Match</div>
                    <div className="mr-2 sidebar-brand-icon rotate-n-15">
                        <i className="fas fa-football-ball"/>
                    </div>
                </h1>
                <h3 className="text-center companySlogan" style={{textShadow: "2px 2px #999999"}}>WHO'LL BE THE CHAMPION PLAYER IN YOUR TEAM THIS SEASON?</h3>
            </div>
        </div>
    );
}

export default LandingJumbo;
