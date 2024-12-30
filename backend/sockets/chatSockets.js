const Chat = require('../Models/chat');

const chatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // Listen for messages from clients
    socket.on('sendMessage', async (data) => {
      const { sender, receiver, message } = data;

      // Save the message in the database
      const chat = new Chat({ sender, receiver, message });
      await chat.save();

      // Emit the message to the receiver if connected
      io.to(receiver).emit('receiveMessage', {
        sender,
        message,
        timestamp: chat.timestamp,
      });
    });

    // Join a specific room (optional, for private messaging)
    socket.on('joinRoom', (room) => {
      socket.join(room);
      console.log(`User joined room: ${room}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = chatSocket;
