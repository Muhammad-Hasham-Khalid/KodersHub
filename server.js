require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;

//--------------------- END OF IMPORT----------------
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cors());

app.use(
	cors({
		origin: 'http://localhost:3000', // <-- location of the react app were connecting to
		credentials: true
	})
);

app.use(
	session({
		secret: 'secretcode',
		resave: true,
		saveUninitialized: true
	})
);

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//--------------------- END OF MIDDLEWARE----------------

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/user'));

// const htmlTestRoute = require("./routes/htmlTestRoute");
// app.use(htmlTestRoute);

// const cssTestRoute = require("./routes/cssTestRoute");
// app.use(cssTestRoute);

app.use(require('./routes/jsTest/jsTestRoute'));

//--------------------- END OF ROUTES ----------------

app.listen(PORT, console.log(`Server started to run on PORT: ${PORT}`));
