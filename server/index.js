if (process.env.NODE_ENV === 'development') require('./secrets');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const morgan = require('morgan');
const { resolve } = require('path');
const { db, User } = require('./db');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbStore = new SequelizeStore({ db: db });
const passport = require('passport');
const port = process.env.PORT;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: dbStore,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  try {
    done(null, user.id);
  } catch (err) {
    done(err);
  }
});

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => done(null, user))
    .catch(done);
});

app.use(morgan('dev'));
app.use(express.static(resolve(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes'));
app.use('*', (req, res, next) => {
  res.sendFile(resolve(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  // console.log(err);
  // console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal Server Error');
});

db.sync({ force: true }).then(() => {
  dbStore.sync().then(() => {
    server.listen(port, () => console.log('listening on port:', port));
  });
});