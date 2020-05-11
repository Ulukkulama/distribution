const express = require('express');
const bodyParser = require('body-parser');

const mySqlConnection = require('./dbConnection');
const agentAccessRoute = require('./routes/agentAccess');
const shopsManageRoutes= require('./routes/shopsManage')

const app = express();

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());

// ------------------------------------------- routes --------------------------------------------------- //
app.use('/api/agent', agentAccessRoute);
app.use('/api/shop', shopsManageRoutes);
// ------------------------------------------------------------------------------------------------------ //

const port = (process.env.PORT || 6969);

app.listen(port, () => {
    console.log(port);
});
