import React, { useState } from 'react'
import { Link } from 'react-router-dom'

let user;//is variable ko agar function k andar rakhenge to ye export nahi ho payega
export default function Join() {
     const [name,setName]=useState("");
    function sendUser(){
      user=document.getElementById('joinInput').value
    }
  return (
   <>
<center>
<div className="container" style={{backgroundColor:'black',height:'25rem',width:'20rem',marginTop:'5rem'}}>

<div className="container">
    <img src='logo.png' alt="" style={{width:'5rem',height:"5rem"}}/><br></br><br></br>
    <h1 style={{color:'blue',borderBottom:'0.2rem solid white'}}>Messenger</h1><br></br>
 
    <input type='text' id='joinInput' onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' style={{borderRadius:'0.5rem'}}></input><br></br><br></br>
  <Link onClick={(e)=>!name?e.preventDefault():null} to='/chat'><button className="btn btn-danger" style={{marginTop:'0.5rem',width:'10rem'}} onClick={sendUser}>LogIn</button></Link>
  {/**!name means  name khali hai,name k andar koi value nahi hai */}
</div>
  
</div></center>
   
   </>
  )
}
export {user}