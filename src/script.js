
var redirect_uri = "http://localhost:5173/callback";    // TODO: Import from .json file to hide!
const SICKO_MODE = true;

const params = new URLSearchParams(window.location.search);
const code = params.get("code");
var accessToken;
var refreshToken;


// Checks to see if this is a callback URL. If it is, retrieve the code generated from the spo
if (code) {
    SICKO_MODE && console.log("Callback code detected.");
    
    let response = await requestTokens(clientId, code);
    SICKO_MODE && console.log("Response from server: " + response);

    accessToken = response.access_token;
    refreshToken = response.refresh_token;

    console.log(accessToken);
    console.log(refreshToken);
    localStorage.setItem("spotify_access_token", accessToken);
    localStorage.setItem("spotify_refresh_token", refreshToken);

    if (accessToken) {
        document.location =
        "http://localhost:5173"
    }
}

if (localStorage.getItem("spotify_access_token")) {
    SICKO_MODE && console.log("Access code detected.");
}


$("#connect-to-spotify-btn").click(function () {
    retrieveCode();
});

function retrieveCode() {
    var state = generateCodeVerifier(16);
    localStorage.setItem("verifier", state);

    // Scope documentation: https://developer.spotify.com/documentation/web-api/concepts/scopes
    var scope = "user-read-private user-read-email user-read-currently-playing user-top-read user-read-recently-played";

    const params = {
        client_id: clientId,
        response_type: "code",
        redirect_uri: "http://localhost:5173/callback",
        scope: scope,
        state: state
    };

    document.location =
        "https://accounts.spotify.com/authorize?" + $.param(params);
}

function generateCodeVerifier(length) {
    SICKO_MODE && console.log("Generating code verifer...");
    let text = "";
    let possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    SICKO_MODE && console.log("Code verifier: " + text);
    return text;
}

async function requestTokens(clientId, code) {
    SICKO_MODE && console.log("Retrieving access tokens...");

    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:5173/callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': 'Basic ' + (btoa(clientId + ':' + clientSecret).toString('base64'))
         },
        body: params
    });

    return await result.json();
}


const getRefreshToken = async () => {
    // refresh token that has been previously stored
    const refreshToken = localStorage.getItem('refresh_token');
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
