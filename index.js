const express = require('express');
const axios = require('axios');
require('dotenv').config()

const app = express();
const port = 3000
const cors = require('cors');


app.use(cors());
app.use(express.static('static'));


app.get('/event', async function(req, res) {
    const pageId = process.env.FACEBOOK_PAGE_ID; // page ID
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN; //access token

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
