const express = require("express")
const mongoose = require("mongoose")
const items = require("./routes/api/items")
const users = require("./routes/api/Users")
const auth = require("./routes/api/auth")
const path = require("path")
const config = require("config")

const app = express()

//bodyparser middleware

app.use(express.json())

// DB config

const db = config.get("mongoURI");

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

// Use Users

app.use("/api/users", users)

// Use authentication

app.use("/api/auth", auth)

// Serve static assets if in Production

if(process.env.NODE_ENV === "production") {
    //Set a static folder
    app.use(express.static("client/build"))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

// Make app listener

const Port = process.env.PORT || 5000

app.listen(Port, () => console.log(`Server is running on port ${Port}`))