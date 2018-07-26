const functions = require('firebase-functions')
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.set('views', './views')

require('./routes/routes.js')(app);

exports.app = functions.https.onRequest(app);