const express = require('express')
const app = express()
const port = 3030
const cors = require("cors")
const route = require("./routes")


app.use(cors())

app.use(express.json())

app.use(express.urlencoded({
    extended: true
}))

app.use("/",route)

app.listen(port, () => {
    console.log("Listening Server at " + port)
})