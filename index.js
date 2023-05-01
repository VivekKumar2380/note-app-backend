const express=require("express")
const {connection}=require("./db")
const {UserRouter}=require("./routes/User.routes")
const {auth} = require("./middleware/auth.middleware")
const {noteRouter}=require("./routes/Note.routes")
const cors=require("cors")
require("dotenv").config()
const app =express()
app.use(cors())
app.use(express.json())
app.use("/users", UserRouter)

 

 //protected Routes
 app.use(auth)
 app.use("/notes", noteRouter)


app.listen(process.env.port, async()=>{
   try {
    await connection
    console.log("Connected to the Db")
    console.log(`server is running at port ${process.env.port}`)
   } catch (error) {
    console.log(error.message)
   }
})