const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');
passport.use('local.signin', new LocalStrategy({
  usernameField: 'nombre',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, nombre, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE nombre = ?', [nombre]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Bienvenido ' + user.nombre));
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta'));
    }
  } else {
    return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
  }
}));
passport.use('local.signup', new LocalStrategy({
  usernameField: 'nombre',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, nombre, password, done) => {

  const { fullname } = req.body;
  let newUser = {
    fullname,
    nombre,
    password
  };
  newUser.password = await helpers.encryptPassword(password);//Porceso de encriptacion de claves
  // Guardando en la BD
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});