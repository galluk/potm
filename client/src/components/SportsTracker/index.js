import React, { useState, useEffect } from 'react';
import Marquee from "react-fast-marquee";

function SportsTracker() {
    const [trackerText, setTrackerText] = useState('');
    // let articles;
    // let tickerConfig = {};

    useEffect(() => {
        getSportsNews()
    }, [])

    function getSportsNews() {
        let url = 'http://newsapi.org/v2/top-headlines?' +
            'country=au&category=sports&apiKey=2f5a10ceb2fc41d3ab24f754edacaa49';
        let req = new Request(url);
        fetch(req)
            .then(response => response.json())
            .then((data) => {
                if (data.status === 'ok') {
                    let articles = data.articles;
                    let tmpText = '';

                    articles.forEach(article => tmpText = `${tmpText}  --  ${article.title}`);
                    console.log(tmpText);
                    setTrackerText(tmpText);
                }
            })
    }

    return (
        <Marquee style={{height: 30}}>
            <p>{trackerText}</p>
        </Marquee>
    )
}

export default SportsTracker;