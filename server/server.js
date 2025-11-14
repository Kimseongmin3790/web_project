const express = require('express')
const cors = require('cors') 

const stuRouter = require("./routes/student")
const productRouter = require("./routes/product")
const userRouter = require("./routes/user")

const app = express()
app.use(cors({
    origin : ["http://192.168.30.10:5500"],
    credentials : true
}))
app.use(express.json());

// router 영역
app.use("/student", stuRouter);
app.use("/product", productRouter);
app.use("/user", userRouter);

app.listen(3000, ()=>{
    console.log("server start!");
})