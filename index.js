const express = require('express');
const serverless = require('serverless-http');
const axios = require('axios');
require('dotenv').config();

const app = express();
const cors = require('cors');

app.use(cors());

app.get('/', async function(req, res) {
    const pageId = process.env.FACEBOOK_PAGE_ID;
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

    try {
        const response = await axios.get(`https://graph.facebook.com/v17.0/${pageId}/events?time_filter=upcoming&access_token=${accessToken}`);

        const events = response.data.data.map(event => ({
            name: event.name,
            startTime: event.start_time,
            location: event.place ? event.place.name : null,
            url: `https://www.facebook.com/events/${event.id}`,
        }));

        res.status(200).json(events);
    } catch (error) {
        console.error('There was an error:', error.message);
        res.status(500).json({ error: 'Unable to fetch events' });
    }
});

module.exports.handler = serverless(app);