const express = require('express')
const app = express()
const port = process.env.PORT || 3000;

const mongoose = require('mongoose')
const configDB = require('./config/database.js')
mongoose.connect(configDB.url, {useMongoClient: true})

const passport = require('passport')
require('./config/passport')(passport)
const flash = require('connect-flash')

const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')


// Express
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', './views')

// Passport
app.use(session({ secret: 'shhitsadamnsecretmate' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
require('./app/routes.js')(app, passport);

// Launch
app.listen(port)