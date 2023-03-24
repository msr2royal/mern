const express = require('express');
const mongoose = require('mongoose');
const TaskSchema = require('./model');
const cors = require('cors');
 
const app = express();

const PORT = 5000;
app.use(express.json());

app.use(cors({
    origin:'*'
}));

mongoose.connect('mongodb+srv://root:root@cluster0.uxd7kfa.mongodb.net/?retryWrites=true&w=majority',
    {
    useNewUrlParser:true,
    useUnifiedTopology:true
    }
).then(()=>console.log('DB connected successfully!'));

app.post('/addtask',async(req,res)=>{
  const {todo}  = req.body;
    try{
        const newData = new TaskSchema({
            todo:todo 
        });
        await newData.save();
        return res.json(await TaskSchema.find());
    }catch(err){
        console.log(err);
    }
});

app.get('/gettask',async(req,res)=>{
 try{
    return res.json(await TaskSchema.find());
 }catch(err){
    console.log(err);
 }
});
app.delete('/deletetask/:id',async(req,res)=>{
    try{
        await TaskSchema.findByIdAndDelete(req.params.id);
        return res.json(await TaskSchema.find());
     }catch(err){
        console.log(err);
     }
});

app.listen(PORT,()=>console.log(`http://localhost:${PORT}/`));