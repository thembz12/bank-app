const express = require ("express")
const cors = require('cors')
require("./config/db")
const router = require("./router/router")
const port = process.env.port || 2332
const app = express()
app.use(cors("*"))
app.use(express.json())
app.use(router)

app.listen(port,()=>{
    console.log("server is listening to port", port);
})

app.get("/", (req,res)=>{
    res.status(200).json({message:"HELLO WORLD"}) 
}) 