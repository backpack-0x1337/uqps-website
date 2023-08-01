const axios = require('axios');

exports.handler = async function(event, context) {
    const pageId = process.env.FACEBOOK_PAGE_ID; // page ID
    const accessToken = process.env.FACEBOOK_ACCESS_TOKEN; // access token

    try {
        const response = await axios.get(`https://graph.facebook.com/v17.0/${pageId}/events?time_filter=upcoming&access_token=${accessToken}`);

        const events = response.data.data.map(event => ({
            name: event.name,
            startTime: event.start_time,
            location: event.place ? event.place.name : null,
            url: `https://www.facebook.com/events/${event.id}`,
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(events)
        }
    } catch (error) {
        console.error('There was an error:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Unable to fetch events' })
        }
    }
};
