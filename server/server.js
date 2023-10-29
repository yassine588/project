const express = require("express")
const cors=require("cors")
const app = express()
app.use(cors(),express.json(),express.urlencoded({extended: true}))
require("dotenv").config()
require("./conifg/mongoose.config")
require("./routes/Data.routes")(app) 
require("./routes/Demande.routes")(app)
const port =process.env.PORT
app.listen(port,()=>{
    console.log(`>>>>> server is running on Port ${port}😊😊`)
})