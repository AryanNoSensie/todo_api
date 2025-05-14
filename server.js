import express from 'express';

import connecttodb from './database/db.js';
import { Todo } from './models/todo.model.js';

import dotenv from 'dotenv';

dotenv.config();
const app = express();

const port = process.env.port || 3000;

//middleware for data parsing in json format 
app.use(express.json());

//connecting to db 
connecttodb();





//routes fot todo apis 
app.get('/todo' , async (req,res) =>{
    try {
        const result = await Todo.find();
        res.send({
            success : true,
            message : "fetched all todos",
            data : result
        })
        
    } catch (error) {
        res.send({
            success : false,
            message : "couldnt able to fetcxh all todos ",
            error : error.message
        })
    }
})

//post api endpoint 
app.post('/createtodo' , async (req,res) =>{
    const todoinfo = req.body;
try {
    const result = await Todo.create(todoinfo);
    res.send({
        success : true,
        message : "todo created successfully",
        data : result
    })
    
} catch (error) {
    console.log(error);
    res.send({
        success : false,
        message : "couldnt able to create todo",
        data: result
    })
}

})


app.get('/:todoId', async (req,res) => {
    const todoId = req.params.todoId;
    try {
        const result = await Todo.findById(todoId);  // Changed from findBy to findById
        res.send({
            success: true,
            message: "fetched todo",
            data: result
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Could not fetch todo",
            error: error.message  // Changed from data:result to error:error.message
        })
    }
})

//PATCH REQUEST TO UPDATE THE TODOS 
app.patch('/:todoId', async (req,res) => {
    const todoId = req.params.todoId;
    const updatedInfo = req.body;
     try {
        const result = await Todo.findByIdAndUpdate(todoId, updatedInfo, { new: true });
        res.send({
            success: true,
            message: "Todo updated successfully",
            data: result
        })

        
     } catch (error) {
        res.send({
            success: false,
            message: "Could not update todo",
            error: error.message
        })
     }
    })


    //DELETE REQUEST TO DELETE THE TODOS
    app.delete('/delete/:todoId', async (req,res) => {
        try {
            await Todo.findByIdAndDelete(req.params.todoId);
            res.send({
                success: true,
                message: "Todo deleted successfully",
                data: null
            })
            
        } catch (error) {
            res.send({
                success: false,
                message: "Could not delete todo",
                error: error.message
            })
            
        }
    })


//port 
app.listen(port,()=>{
    console.log(`server is running on port  ${port}`);
})