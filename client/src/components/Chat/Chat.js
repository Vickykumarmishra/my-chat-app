import React, { useEffect, useState } from 'react'
import { user } from '../Join';
import { Link } from 'react-router-dom';
import ReactScrollToBottom from 'react-scroll-to-bottom'
//import Message from './components/message/message'
import Message from '../Message/Message';
import socketIo from "socket.io-client";
const ENDPOINT="https://chatting99.onrender.com";
let socket;
export default function Chat() {
   const [id, setid] = useState('')
   const [messages,setMessages]=useState([])
  const send=()=>{
   const message= document.getElementById('chatInput').value;
    socket.emit('message',{message,id})//message bhej diye
    document.getElementById('chatInput').value=''//message send karne k badf input field se vo message hat jaye.naya message likhne k liye jagah clean ho jayega.
  }

  useEffect(()=>{

  socket=socketIo(ENDPOINT,{transports:['websocket']})//is code ko useffect k bahar rakhenge to har chiz do-do bar chalega. isliye isko useeffect  k andar dal dena hi sresth hoga. 
/*In the above code, the useEffect hook is called with an empty array [] as its second argument.
This means that the hook will only run once, during the initial render(बनाना) of the component.
During this initial render, the socket connection will be established, and event listeners will be added to the socket instance.
         the initial render of a component refers to the first time the component is rendered on the page. This happens when the component is first mounted onto the DOM. 
         In other words, when the component is first created and inserted into the DOM, the initial render occurs. */

    socket.on('connect',()=>{
      alert(`${user} has connected`);
      /*var x=socket.id;
      console.log(x);//tJrPg7xunc8-OaIhAAAB->this kind of id is alloted to every sockets on their connection.*/
      setid(socket.id);//new socket ya kahe ki ek new user  ke connect hote hi uska id setid k madhyam se chala jayega.
    })
    //console.log(socket)
    socket.emit('joined',{info:user})//data bhej rahe hai jo user variable k andar hai.this data will be recieved by index.js file or server file.
    socket.on('welcome',(data)=>{
      setMessages([...messages, data]);
      console.log(`${data.user} ${data.message }`)
    })

    socket.on('userjoined',(data)=>{
      setMessages([...messages, data]);
      console.log(data.user,data.message);
    })

    socket.on('leave',(data)=>{
      setMessages([...messages, data]);
        console.log(data.user,data.message);
    })

    return ()=>{

      /*In React, unmounting refers to the process of removing a component from the DOM. When a component is unmounted, all of its state and event handlers are removed, and any ongoing processes are terminated. 
      In the code you provided, the cleanup function in the useEffect hook is responsible for cleaning up any effects that are no longer needed when the component unmounts. In this case, the cleanup function emits a 'disconnect' event and removes all event listeners from the socket. 
      This ensures that any ongoing socket connections are closed and no memory leaks occur when the component is unmounted. */
      //this return is used in useffect to clean the effect that are no longer needed such as Timeouts, subscriptions, event listeners.in our case we will clean that socket whose user has disconnected.
       socket.emit('disconnectt');
       socket.off();

      /**The useEffect hook also returns a cleanup function that will be called when the component unmounts.
The socket.emit() method is used to emit a custom 'disconnect' event when the component unmounts.
The socket.off() method is used to remove all event listeners from the socket when the component unmounts. */ 

    }
  },[])

  useEffect(()=>{
   socket.on('sendMessage',(data)=>{
      setMessages([...messages,data]);// if messages is an array of messages, and data represents a new message, [...messages,data] will create a new array that includes all the existing messages in messages, followed by the new message represented by data
      //console.log(data.user,data.message,data.id)
      console.log(data.user,data.message)
    })
    return()=>{
      socket.off();
    }

  },[messages]);

  return (
    
    <div className='container-fluid' id='chatpage' style={{backgroundColor:'orange',height:'35rem',width:"100%"}}><br></br><br></br>
         <Link to='/Join'><button className='btn btn-danger'>go to login page</button></Link> <h4 style={{color:'red'}}>wait for few seconds after login....</h4>
      <center> <diV className='container-fluid' id='chatbox' style={{backgroundColor:'green',height:'25rem',width:'70%'}}>
        <div className='container-fluid' id='header' style={{backgroundColor:'red',height:'2rem'}}></div>

        <div className='container-fluid' id='messagearea' style={{backgroundColor:'white',height:'18rem',border:'0.15rem solid black',overflowY:'auto'}}>  
        {/**to write javascript inside jsx we need to use a curly braces as a whole. */}
        {messages.map((item,i)=> <Message user={item.id===id?'':item.user} message={item.message} classs={item.id===id?'right':'left'}/>)}
        </div>
          
        <div className='container-fluid' id='inputbox'>

        <div className="input-group mb-3" style={{marginTop:"1rem"}}>
  <input type="text" className="form-control" id='chatInput' placeholder="write message here" aria-label="Recipient's username" aria-describedby="button-addon2"/>
  <button className="btn btn-light" type="button" id="button-addon2" onClick={send} ><img src='sendmessage.png' style={{width:'1rem'}}/></button>
</div>
        </div>

      </diV></center>
    
    </div>
    
    
    
  )
}
