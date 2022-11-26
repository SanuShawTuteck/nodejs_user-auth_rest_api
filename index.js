const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

//provides Express middleware to enable CORS
const cors = require("cors");
require("dotenv").config({ path: "./.env" })

const db = require('./src/models');
const userRoutes = require('./src/routes/user-route');
const secureRoutes = require('./src/routes/secure-route');
const { authenticateToken } = require('./src/middleware/auth');

// var corsOptions = {
//     origin: "http://localhost:3000"
// };

const app = express();

// app use
//app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));

// parse requests of content-type - application/json
app.use(bodyparser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).send(`Welcome`);
});

app.use('/api/secure/*', authenticateToken)
app.use('/api/user/', userRoutes);
app.use('/api/secure/', secureRoutes);


// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`app is live at http://localhost:${PORT}`);
});

try {
    db.sequelize.authenticate().then(() => {
        console.log('DB Connection has been established successfully.');
    });
    // db.sequelize.sync();    //{ force: true }
    console.log(process.env.PORT)
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
