const express = require('express');
const app = express();
const chalk = require('chalk');
const morgan = require('morgan');
const { resolve } = require('path');
const { db, User } = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db });
const socketio = require('socket.io');
const passport = require('passport');

const PORT = process.env.PORT || 3000;

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser(async (id, done) => {
  console.log('deserializing');
  try {
    const user = await User.findByPk(id);
    done(null, user.sanitize());
  } catch (err) {
    done(err);
  }
});

process.env.NODE_ENV === 'development' && app.use(morgan('dev'));

app.use(express.static(resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'my best friend is Cody',
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

['/auth', '/api'].forEach(path => {
  app.use(path, (req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
});

app.use('*', (req, res, next) => {
  res.sendFile(resolve(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  // console.log(err);
  // console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  const server = app.listen(PORT, () =>
    console.log(chalk.green(`listening on port: ${PORT}`))
  );
  // set up our socket control center
  const io = socketio(server);
  require('./socket')(io);
};

const bootApp = async () => {
  await dbStore.sync();
  await db.sync();
  startListening();
};

if (require.main === module) bootApp();

module.exports = { app, dbStore };
