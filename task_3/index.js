const express = require('express');
const app = express();
const jsonParser = express.json();
app.use(express.json());


const indexRouter = require('./routes/routes');

app.use('/', indexRouter);


app.listen(5000, function(){
    console.log("Server is running ...");
});

