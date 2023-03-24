import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //For reading data
  const [data,setData] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/gettask').then(
      (arr)=>setData(arr.data));
  },[]);

  //For posting data
  const [newTask, setNewTask] = useState('');
  const submitHandler=(e)=>{
    e.preventDefault(); 
    axios.post('http://localhost:5000/addtask',{todo:newTask}).then(
      (arr)=>setData(arr.data)); 
   // console.log(newTask);
  }
  const deleteHandler=(id)=>{
    axios.delete(`http://localhost:5000/deletetask/${id}`).then(
      (arr)=>setData(arr.data)
    )
  }

  return (
    <div className='container py-2'>
      <center> 
      <form onSubmit={submitHandler}> 
        <div className='card' style={{width:'50%'}}>
          <div className='card-header'>
             <h3>Todo App Management</h3>
          </div>
          <div className='card-body'>
            <div className='form-group row'>
              <div className='offset-2 col-6'>
                <input type="text" name="name" onChange={(e)=>setNewTask(e.target.value)} className='form-control'/>
              </div>
              <div  className='col-2'>
              <input type="submit" value="submit" className="btn btn-primary"/>
              </div>
            </div> 
            <div>
              {  
                data.map((item) => 
                <div key={item._id} className='todopad form-control col-6'>
                  <span>{item.todo}</span>&nbsp;<button onClick={()=>deleteHandler(item._id)} className='btn btn-danger btn-sm'>Delete</button>
                </div>)  
              } 
            </div>
          </div>
        </div> 
         
        </form>
          
      </center>
    </div>
  );
}

export default App;
