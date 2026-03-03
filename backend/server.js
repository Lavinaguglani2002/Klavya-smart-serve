const express=require('express')
const app=express()
const cors=require("cors")
const colors=require("colors")
const PORT = process.env.PORT || 8000;

const connectdb=require("./connectdb/db")
const userRoute=require("./route/userRoute")
const dotenv=require("dotenv")
const profileRoute=require("./route/profileRoute")
const blogRoute=require("./route/BlogRoute")
const ServiceRoute=require("./route/ServiceRoute")
const OrderRoute=require("./route/OrderRoute")

app.use(cors())
app.use(express.json())
require('dotenv').config();

connectdb()

app.use("/",userRoute)
app.use("/api",profileRoute)
app.use("/",blogRoute)
app.use("/",ServiceRoute)
app.use("/",OrderRoute)



app.listen(PORT,()=>{
    console.log(colors.green(`server is running on`)  +colors.red (` ${PORT}`))
})
app.get("/", (req, res) => {
    res.send("Backend is running successfully!");
  });
  


