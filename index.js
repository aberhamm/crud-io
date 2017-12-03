const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config');
const socket = require('socket.io');
const expressStaticGzip = require("express-static-gzip");

// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

app.use('/', expressStaticGzip('./server/static/'));

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
});

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log('Server is running on port ' + port);
});

const io = socket(server);
io.on('connection', socket => {
  socket.on('donate', (data) => {
    socket.broadcast.emit('donate', data);
  });
});

global.socketIO = io;
