const express= require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./src/config/serverConfig');
const routes = require('./src/routes/index');
const setupAndStartServer = async ()=>{
    const app= express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.use('/api',routes);
    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
    });
}
setupAndStartServer();