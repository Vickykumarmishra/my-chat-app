import React from 'react'
import './Message.css'
export default function Message({user,message,classs}) {

    if(user){//if user exists then //it becomes true when user has some value stored in it .
        return (
            <div className={`messageBox ${classs}`} >
              {`${user}: ${message}`}
            </div>
          )  
    }
    else{

        return (
            <div className={`messageBox ${classs}`} >
              {`You: ${message}`}
            </div>
          )

    }
  
}
