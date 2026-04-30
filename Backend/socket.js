const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // JOIN SOCKET
    socket.on('join', async ({ userId, userType }) => {
      try {
        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }

        if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }

        console.log(`${userType} joined → ${userId}`);
      } catch (err) {
        console.error('Join error:', err.message);
      }
    });

    // UPDATE CAPTAIN LOCATION
    socket.on('update-location-captain', async ({ userId, location }) => {
      if (!location?.lat || !location?.lng) return;

      try {
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.lat,
            lng: location.lng
          }
        });
      } catch (err) {
        console.error('Location update error:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });
}

// SEND MESSAGE TO ONE SOCKET
const sendMessageToSocketId = (socketId, { event, data }) => {
  if (io && socketId) {
    io.to(socketId).emit(event, data);
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
