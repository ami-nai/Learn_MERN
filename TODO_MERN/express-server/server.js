import express from "express"
import dotenv from "dotenv"
import connectToDB from "./database/db.js";
import { Todo } from "./models/todo.model.js";
dotenv.config();

const app = express()
const port = process.env.port || 4000;

//middleware
app.use(express.json());

connectToDB();

//TODO APIs

//List of todos
app.get("/todos", async (req, res)=> {
    try{
        const result = await Todo.find();
        res.send({
            success: true,
            message: "Todo Lists Retrived Successfully",
            data: result
        })
    } catch(error){
        res.send({
            success: true,
            message: "Failed to Retrive Todo Lists",
            data: result
        })
    }
});


//Server activaiton check
app.get("/", (req, res)=>{
    res.send({
        success: true,
        message: "Server is Active",
    })
});


//Create a todo
app.post("/create-todo", async (req, res) => {
    const todoDetails = req.body
    try{
        const result = await Todo.create(todoDetails);
        res.send({
            success: true,
            message: "Todo is created succesfully",
            data: result
        })
    }catch(error){
        console.log(error);
        res.send({
            success: true,
            message: "Failed to create Todo",
            data: result
        })
    }
});


//Search a todo
app.get("/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    try {
        const result = await Todo.findById(todoId);

        res.send({
            success: true,
            message: "Todo is Retrived Successfully",
            data: result
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to Retrive Todo",
            data: result
        })
    }
});


//Update a todo
app.patch("/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    const updatedTodo = req.body;
    try {
        const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
            new: true,
        });

        res.send({
            success: true,
            message: "Todo is updated Successfully",
            data: result
        })
    } catch (error) {
        res.send({
            success: false,
            message: "Failed to update Todo",
            data: result
        })
    }
});


//Delete a todo
app.delete("/delete/:todoId", async (req, res) => {
    const todoId = req.params.todoId;
    
    try {
        const result = await Todo.findById(todoId);
        await Todo.findByIdAndDelete(todoId);

        res.send({
            success: true,
            message: "Todo is deleted Successfully",
            data: null
        })
    } catch (error) {
        res.send({
            success: true,
            message: "Failed to delete Todo",
            data: result
        })
    }
});


app.listen(port, () =>{
    console.log('SERVER IS RUNNING ON PORT ' + port);
});