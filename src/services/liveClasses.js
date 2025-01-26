import { google } from 'googleapis';

async function scheduleGoogleMeet() {
    // Setup OAuth2 Client with Google Meet API
    const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    oAuth2Client.setCredentials({ refresh_token: 'YOUR_REFRESH_TOKEN' });

    const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });
    const event = {
        summary: 'Online Class',
        description: 'Live class via Google Meet',
        start: { dateTime: '2024-01-01T09:00:00-07:00', timeZone: 'America/Los_Angeles' },
        end: { dateTime: '2024-01-01T10:00:00-07:00', timeZone: 'America/Los_Angeles' },
        conferenceData: {
            createRequest: { requestId: 'meet' + Math.random().toString(36).substring(2, 15) }
        }
    };

    const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
        conferenceDataVersion: 1,
    });

    return response.data.hangoutLink; // Returns Google Meet link
}
