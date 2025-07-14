const express= require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./src/config/serverConfig');
const setupAndStartServer = async ()=>{
    const app= express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended : true}));
    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
    });
}
setupAndStartServer();