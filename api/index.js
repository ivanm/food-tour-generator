const serverless = require('serverless-http');
const express = require('express');
const fetch = require('node-fetch').default;
const cors = require('cors');

const app = express();
const apiPort = process.env.API_PORT || 3001;
const YELP_API_URL = process.env.YELP_API_URL || 'https://api.yelp.com/v3';
const YELP_API_KEY = process.env.YELP_API_KEY;

function buildUrlQuery(url, options) {
    const newUrl = new URL(url);
    Object.keys(options).forEach(function(key) {
        newUrl.searchParams.append(key, options[key]);
    });
    return newUrl.href;
}

app.use(cors());

app.get('/search', function(req, res) {
    fetch(
        buildUrlQuery(`${YELP_API_URL}/businesses/search`, {
            location: 'New York',
            radius: '5000',
            term: 'Food',
            ...req.query,
            sort_by: 'rating',
            limit: '20'
        }),
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${YELP_API_KEY}`
            },
            credentials: 'same-origin'
        }
    )
        .then(function(res) {
            return res.text();
        })
        .then(function(body) {
            res.send(JSON.parse(body));
        })
        .catch(function(error) {
            error.message;
        });
});

app.listen(apiPort, function() {
    console.log(`[api] Listening at port ${apiPort}`);
});

module.exports.handler = serverless(app);
