
require('dotenv').config()



const express = require('express');
const app = express();
const path = require("path")
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const connectToDB = require("./config/db");



const userRoutes = require('./routes/userRoutes');
const lectureRoutes = require('./routes/lectureRoutes')
const scheduleRoutes = require('./routes/scheduleRoutes')



app.use(express.json())

app.use(cors())

connectToDB()



app.use('/api/auth', userRoutes)
app.use('/api/lecture',  lectureRoutes)

app.use('/api/schedule', scheduleRoutes)



const clientPath = path.join(__dirname, "../client/dist");

app.use(express.static(clientPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});


app.listen(PORT, () =>{
    console.log(`Server is listening on port:${PORT}`)
})



