const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const items = require("./routes/api/items")

const app = express()

//bodyparser middleware

app.use(bodyParser.json())

// DB config

const db = require("./config/keys").mongoURI;

//connect to mongoDb
mongoose
    .connect(db, { 
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true 
    })
    .then(() => console.log("MongoDb is connected...."))
    .catch((err) => console.log("Sorry couldn't connect to MongoDb", err))

// Use Items

app.use("/api/items", items)

// Make app listener

const Port = process.env.PORT || 5000

app.listen(Port, () => console.log(`Server is running on port ${Port}`))