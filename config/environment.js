require('dotenv').config()

const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:process.env.session_cookie_key,
    db:process.env.db,
    google_clientID:process.env.google_clientID,
    google_clientSecret:process.env.google_clientSecret,
    google_callbackURL:process.env.google_callbackURL,
    jwt_secret:process.env.jwt_secret,
}

module.exports=development