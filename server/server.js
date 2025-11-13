const express = require('express')
const cors = require('cors') 
const db = require("./db");

const app = express()
app.use(cors({
    origin : ["http://192.168.30.10:5500"],
    credentials : true
}))
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello world!')
})

app.get('/test', (req, res) => {
    res.send("test page(get)");
})

app.post('/test', (req, res) => {
    res.send("test page(post)");
})

app.get('/student', async (req, res) => {
    try {
        let sql = "SELECT * FROM STUDENT";
        let [list] = await db.query(sql);
        // console.log(list);
        res.json({
            result : "success",
            list : list
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.get('/student/:stuNo', async (req, res) => {
    let { stuNo } = req.params;
    // console.log(stuNo);
    try {
        let sql = "SELECT * FROM STUDENT WHERE STU_NO = " + stuNo;
        let [list] = await db.query(sql);
        // console.log(list);
        res.json({
            result : "success",
            info : list[0]
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.delete('/student/:stuNo', async (req, res) => {
    let { stuNo } = req.params;    
    try {
        let sql = "DELETE FROM STUDENT WHERE STU_NO = " + stuNo;
        let result = await db.query(sql);
        console.log(result);
        res.json({
            result : result,
            msg : "success"
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.post('/student', async (req, res) => {
    let { stuNo, stuName, stuDept } = req.body
    try {
        let sql = `INSERT INTO STUDENT (STU_NO, STU_NAME, STU_DEPT) VALUES(?, ?, ?)`;    
        let result = await db.query(sql, [stuNo, stuName, stuDept]);

        res.json({
            result : result,
            msg : "success"
        });
    } catch (error) {
        console.log("에러 발생!");
    }
})

app.post('/login', async (req, res) => {
    let { stuNo, stuName } = req.body
    let msg = "";
    let result = "";
    try {
        let sql = `SELECT * FROM STUDENT WHERE STU_NO = ${stuNo}`;
        let [list] = await db.query(sql);        
        if (list != "") {   
            sql = `SELECT * FROM STUDENT WHERE STU_NO = ${stuNo} AND STU_NAME = '${stuName}'`
            let [list2] = await db.query(sql);
            if (list2 != "") {
                msg = "로그인 성공";
                result = "success";
            } else {
                msg = "이름이 일치하지 않습니다";
                result = "fail";
            }
        } else {
            msg = "없는 학번입니다";
            result = "fail";
        }
        
        res.json({
            result : result,
            msg : msg
        });
    } catch (error) {
        console.log(error);
    }
})

app.listen(3000, ()=>{
    console.log("server start!");
})