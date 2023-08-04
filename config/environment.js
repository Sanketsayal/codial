

const development={
    name:'development',
    asset_path:'./assets',
    session_cookie_key:'blahsomething',
    db:'mongodb://0.0.0.0:27017/codial',
    google_clientID:'748950712273-k2429c5nfuelkilqi7e5jvoa7lqq5kf7.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    jwt_secret:'codial'
}

const production={
    name:'production',
    asset_path:process.env.ASSET_PATH,
    session_cookie_key:'blahsomething',
    db:'codial',
    google_clientID:'748950712273-k2429c5nfuelkilqi7e5jvoa7lqq5kf7.apps.googleusercontent.com',
    google_clientSecret:'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',
    google_callbackURL:'http://localhost:8000/users/auth/google/callback',
    jwt_secret:'codial'
}

module.exports=development