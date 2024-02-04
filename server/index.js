const express = require('express')
const mongoose = require('mongoose')
const rootRouter = require('./routes/index')
const {mongodb,dbName,dbUrl} = require('./config/dbConnection')
const cors = require('cors')
const app = express();
mongoose.connect(dbUrl);


const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(express.json());
app.use("/api", rootRouter );

app.listen(PORT, ()=>{
    console.log(`App is running on ${PORT}`);
});