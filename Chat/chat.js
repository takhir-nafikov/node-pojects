const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {Strategy} = require('passport-jwt');
const {jwt} = require('./config');

mongoose.connect('mongodb://localhost:27017/chat', {useMongoClient: true});
mongoose.Promise = require('bluebird');

const handlers = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    },
});

// jwt_payload ? 
passport.use(new Strategy(jwt, (jwtPayload, done) => {
    if (jwtPayload != void(0)) return done(false, jwtPayload);
    done();
}));

app.engine('hbs', handlers.engine);
app.set('view engine', 'hbs');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());

require('./pouter')(app);

require('./sockets')(io);

server.listen(app.get('port'), () => {
    console.log(`Сервер запущен на порте: ${app.get('port')}`);
 });
