var clientId = "df91e74dc11f45d99f2529e20c3e6869";
var redirect_uri = "http://localhost:5173/callback";

const params = new URLSearchParams(window.location.search);
const code = params.get("code");

if (code) {
    if (!localStorage.getItem("spotify_access_code")) {
        localStorage.setItem("spotify_access_code", code);
    } else if (localStorage.getItem("spotify_access_code") != code) {
        localStorage.setItem("spotify_access_code", code);
    } else {
        console.log("kwufehaerf");
    }
}

$("#connect-to-spotify-btn").click(function() {
    retrieveCode();
});

function retrieveCode() {
    // var state = generateCodeVerifier(16);
    // var scope = "user-read-private user-read-email";
    // const params = new URLSearchParams();
    // params.append("client_id", clientId);
    // params.append("response_type", "code");
    // params.append("redirect_uri", "http://localhost:5173/callback");
    // params.append("scope", scope);
    // params.append("state", state);
  
    // document.location =
    //   "https://accounts.spotify.com/authorize?" + params;
}

function generateCodeVerifier(length) {
    console.log("generate code verifer");
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

if (localStorage.getItem("spotify_access_code")) {
console.log("Stored" );

} else {
    console.log("not stored");
}
