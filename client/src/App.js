//import socketIO from 'socket.io-client';//iska hona v jaruri hai tavi socket kam karega
//i can write any name in place of socketIO.
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import Join from './components/Join';
import Chat from './components/Chat/Chat';

//const ENDPOINT='http://localhost:4000/'; //The code you provided sets the ENDPOINT variable to 'http://localhost:4000/', which represents the URL where the server socket is listening for connections.
//const socket=socketIO(ENDPOINT, { transports:['websocket']})


//The above line creates a socket object using the socket.io-client library and connects it to the server at the specified ENDPOINT. The transports option specifies the transport mechanism to use for the socket connection. In this case, it is set to 'websocket', which means that the socket connection will use the WebSocket transport if it is available.
function App() {

 

  
  return (
    <div className="App">
      
     <Router>
      <Routes>
<Route path='/' element={<Join/>} ></Route>
<Route path='/chat' element={<Chat/>}></Route>
<Route path='/join' element={<Join/>}></Route>
</Routes>
     </Router>
    </div>
  );
}

export default App;


//npm i socket.io-client for client side.
//npm i react-scroll-to-bottom to scroll messages .