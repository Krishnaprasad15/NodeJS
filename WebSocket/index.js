const exp = require('constants');
const express= require('express')
const http = require('http');
const path = require('path')
const {Server} = require('socket.io')

const app= express();
const server= http.createServer(app);
const io = new Server(server);

io.on('connection', (socket)=>{
    
})

app.use(express.static(path.resolve('./public')))

app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html')
})

server.listen(5000,()=> console.log("server started!"))