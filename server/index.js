require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const express = require('express')
const userCtrl = require('./controllers/user')
const postCtrl = require('./controllers/posts')

let { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express();

app.use(express.json());

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 }
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
}).then(() => {
    app.set('db')
    console.log('database has connected')
})

//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

// Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost)

app.listen(SERVER_PORT, () => console.log(`running on ${SERVER_PORT}`));