const express = require('express');
const app = new express();
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname + '/public')));

app.set('view engine', 'ejs');

const {routes} = require("./routes/routes");
const { checkUser } = require("./middleware/authMiddleware");

// route
app.get('*', checkUser);
app.use(routes);

const PORT = process.env.PORT || 3000;
const dbURI = "mongodb://localhost:27017/letspeakenglish";

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then((result) => app.listen(PORT))
    .catch((err) => console.log(err))