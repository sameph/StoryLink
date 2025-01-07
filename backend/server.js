const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const chatSocket = require('./sockets/chatSocket');


const app = express();
app.use(express.json());

// Create an HTTP server and bind Socket.IO
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Attach chatSocket to the IO instance
chatSocket(io);

// Add routes
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/chats', chatRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
