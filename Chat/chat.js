const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});
const mongoose = require('mongoose');
const passport = require('passport');
const {Strategy} = require('passport-jwt');

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

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'hxcKjyX4BdBuBSK6KsTUpd7',
};

// jwt_payload ? 
passport.use(new Strategy(opts, (jwtPayload, done) => {
    if (jwtPayload != void(0)) return done(false, jwt_payload);
    done();
}));

app.engine('hbs', handlers.engine);
app.set('view engine', 'hbs');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

require('./sockets')(io);

server.listen(app.get('port'), () => {
    console.log(`Сервер запущен на порте: ${app.get('port')}`);
 });
