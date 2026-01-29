const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');
const rideModel = require('./models/ride.model'); // your ride model

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    // --- Join socket ---
    socket.on('join', async (data) => {
      const { userId, userType } = data;
      try {
        if (userType === 'user') {
          await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
        } else if (userType === 'captain') {
          await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
        }
        console.log(`${userType} joined: ${userId}`);
      } catch (err) {
        console.error('Join error:', err);
      }
    });

    // --- Update captain location ---
    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;

      if (!location || !location.lat || !location.lng) {
        return socket.emit('error', { message: 'Invalid location data' });
      }

      try {
        await captainModel.findByIdAndUpdate(userId, {
          location: {
            lat: location.lat,
            lng: location.lng
          }
        });
      } catch (err) {
        console.error('Update location error:', err);
      }
    });

    // --- Send new ride to captain ---
    socket.on('send-ride-to-captain', async (rideId) => {
      try {
        const ride = await rideModel.findById(rideId).populate('user'); // Populate user info
        if (!ride) return;

        // Get all captain sockets (or filter by nearby)
        const captains = await captainModel.find({ socketId: { $exists: true } });
        captains.forEach(captain => {
          if (captain.socketId) {
            io.to(captain.socketId).emit('new-ride', ride);
          }
        });

      } catch (err) {
        console.error('Send ride error:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

// --- Utility to send message to a specific socket ---
const sendMessageToSocketId = (socketId, messageObject) => {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.log('Socket.io not initialized');
  }
};

module.exports = { initializeSocket, sendMessageToSocketId };
