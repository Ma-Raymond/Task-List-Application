const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db')


const app = express();

app.use(cors());

// Makes it not undefined! PARSING?
app.use(bodyParser.json())

//Creating Routes

//When we say .get 
//this means that our first param is going to be localhost:4000/task
// Here this kinda works as an api, shooting at localhost and shooting at SQL server
app.get('/tasks',(req,res)=> {
    const TASK_QUERY = "SELECT * FROM todotaskmanager.tasks;";
    connection.query(TASK_QUERY, (err, response)=>{
        if (err) console.log(err)
        else res.send(response)
    })
})

app.post('/updateTask/:taskid',(req,res) => {
    const UPDATE_QUERY = `UPDATE todotaskmanager.tasks SET taskstatus = 1 WHERE taskid=${req.params.taskid}`;
    connection.query(UPDATE_QUERY, (err)=>{
        if (err) console.log(err)
        else res.send('Your task has been updated')
    })
})

app.post('/addTask',(req,res)=> {
    // This is adding query with SQL
    const ADD_QUERY = `insert into todotaskmanager.tasks (task) values ('${req.body.task}')`
    connection.query(ADD_QUERY, (err)=>{
        if (err) console.log(err)
        else res.send('Your task has been sent')
    })
})

// make sure to follow the app.____ because it matter when calling axios.____
app.delete('/deleteTask/:taskid',(req,res)=> {
    const DELETE_QUERY = `DELETE FROM todotaskmanager.tasks where (taskid=${req.params.taskid})`// You have to to req.params for requesting the taskid
    connection.query(DELETE_QUERY, (err,response)=>{
        if (err) console.log(err)
        else res.send("Task has been deleted")
    })
})

app.listen(4000,()=>{
    console.log("Running on Port 4000")
})