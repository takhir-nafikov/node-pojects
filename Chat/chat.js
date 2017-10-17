const express = require('express');
const app = express();
const path = require('path');
const server = require('http').Server(app);
const io = require('socket.io')(server, {serveClient: true});

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

app.engine('hbs', handlers.engine);
app.set('view engine', 'hbs');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('home');
});

io.on('connection', (socket) => {
    socket.emit('connected', 'YEAH!');
});

server.listen(app.get('port'), () => {
    console.log(`Сервер запущен на порте: ${app.get('port')}`);
 });
