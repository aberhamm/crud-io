const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('cookie-session')
const passport = require('passport');
const config = require('./config');
const socket = require('socket.io');

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));

app.use(cookieParser());
app.use(session({
  secret: 'supersecret',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);
app.get("/*", function(req, res) {
  res.sendFile(__dirname + '/server/static/index.html')
})

const server = app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000 or http://127.0.0.1:3000');
});

const io = socket(server);
io.on('connection', socket => {
  console.log(socket.id);
  socket.on('donate', (data) => {
    console.log(data);
    socket.broadcast.emit('donate', data);
  })
});

global.socketIO = io;
