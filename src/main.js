
$("#get-currently-playing-btn").on("click", function() {
    SICKO_MODE && console.log("Clicked 'Get Currently Playing' button!");
} )

async function getCurrentlyPlaying() {
    const url = "https://accounts.spotify.com/api/token";

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            client_id: clientId
        }),
    };
    const body = await fetch(url, payload);
    const response = await body.json();

    localStorage.setItem('access_token', response.accessToken);
    if (response.refreshToken) {
        localStorage.setItem('refresh_token', response.refreshToken);
    }
};