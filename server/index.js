//write npm init to create package.json and do npm i to install node module initially.
//"start":"node index.js",npm start karne se open ho jaeya index.js.server k andar akar tab npm start karna h. cd server->npm start
//https://www.youtube.com/watch?v=u-LBihwjVDk
const express=require('express')
const app=express();//app is the instance of our express app.
const http=require('http');
const server=http.createServer(app)//writing app means we are calling express here.
const socketIO=require('socket.io')

const cors=require('cors');

const port=4000;
const users=[{}];

app.use(cors())//cors is used for inter communication between url 

app.get('/', (req, res) => { res.send('HELL ITS WORKING') })
const io=socketIO(server);//instance of socket.

io.on('connect',(socket)=>{
    console.log('a new user connected');
//On the other hand, socket.on is a method that is used to handle events that occur on a specific socket. A socket represents a connection between a client and the server.
//each time a user joins , a specific socket created. socket.on is used to handle events on a specific socket connection.
   socket.on('joined',(data)=>{
    /**What is the difference between socket on and socket emit?
socket. emit - This method is responsible for sending messages. socket. on - This method is responsible for listening for incoming messages */
//object k form m data pass hua hai emit k dvara.{info:user} =>user object. emit ka matlab data bhejna , on ka matlab recieve karna
     var info2=data.info;
     users[socket.id]=info2//info2 has name of the users who has joined, stored in it.
    /*users[socket.id]=info2; sets the info2 value as the value corresponding to the key socket.id in the users object. 
    This means that the user's information is now stored in the users object with the socket id as the key. */
    console.log(`${info2} has joined`) 
    socket.broadcast.emit('userjoined',{user:"Admin:",message:`${users[socket.id]} has joined`})
    //broadcast means jo user join kiya hai usko chhod ke baki sare users jo already chat kar rahe the unko message chala jayega.
    //You can create and fire custom events using the socket.emit function.
   socket.emit('welcome',{user:"Admin",message:`welcome to the chat,${users[socket.id]}`})/**Socket.IO allows you to define and emit custom events in addition to the built-in events provided by the library. When you emit a custom event, you can choose any name you like for the event, as long as it is a string.
   In this case, the name 'welcome' was chosen to represent an event that is emitted when a new user joins the chat, and the server wants to send a welcome message to the user. */
/**Note that the socket.emit() method is used to emit events to a specific client connection, while io.emit() can be used to emit events to all connected clients. */
   }) 

   socket.on('message',({message,id})=>{
    //io refers to entire circuit, it means ki jitne v log hai sabko chala jayega message.
      
    io.emit('sendMessage',{user:users[id],message,id})
       // users array k andar name store hai(users[socket.id]=info2). har user k join karne par usko id milta hai, to current id par jo v user join kiya hoga uska name store ho jayega user k andar (user:users[id])
       //users[socket.id]=info, it means is id par ye info ka data dal diye.
       //id k andar currrent socket ka id store hoga.
       //user:users[id],aisa karne se is id par users array k andar jo v store hoga vo a jayega.user ka name store hai to vo ayega.
   })


   socket.on('disconnectt',()=>{
    socket.broadcast.emit('leave',{user:'Admin',message:`${users[socket.id]} has left`})
   // app.get('/Join', (req, res) => { res.send('chat room closed') })
   })


});

server.listen(port,()=>{
    console.log("server is working at http://localhost:4000/")
})


//The following example attaches socket.io to a plain Node.JS HTTP server listening on port 3000.



/**const express = require('express')
This line of code imports the express library, which is a tool that helps us build web applications in Node.js.

const socketIO = require('socket.io')
This line of code imports the socket.io library, which is a tool that helps us build real-time communication in our web applications.

const cors = require('cors')->react k sath connection banane ka kam karta hai cors.
This line of code imports the cors middleware, which is a tool that allows us to make requests to different domains in our web application.

const http = require('http')
This line of code imports the built-in http module in Node.js, which helps us create an HTTP server for our web application.

const port = 4000
This line of code sets the port number that our server will listen on. In this example, the server will listen on port 4000.

const app = express()
This line of code creates an instance of the express application, which we'll use to define the routes and middleware for our web application.

const server = http.createServer(app)
This line of code creates an HTTP server using the http module, and passes in our express app instance as an argument. This sets up the server to handle requests using the functionality defined in our express app.

app.get('/', (req, res) => { res.send('HELL ITS WORKING') })
This code defines a route handler function for the HTTP GET request to the root URL of our web application. When a GET request is made to the root URL of our application, this function will be called, and it will send the response "HELL ITS WORKING" to the client.

const io = socketIO(server)
This line of code creates a new instance of the socketIO library, passing in our server instance as an argument. This sets up the server to listen for socket events and emit socket events to clients.

server.listen(port, () => { console.log('server is working') })
This line of code starts the server listening on the port specified in the port variable. Once the server is listening, the callback function passed as the second argument to listen will be called, and it will log the message "server is working" to the console.

Overall, these lines of code set up an HTTP server using the http module, create an instance of the express application, define a route handler function for the root URL of the application, create an instance of the socketIO library to enable real-time communication, and start the server listening on a specified port.
 */