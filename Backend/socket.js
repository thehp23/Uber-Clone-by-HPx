const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

// Function to initialize the socket.io server
function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*", // Allow all origins, adjust as needed
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`✅ Connected: ${socket.id}`);

    socket.on("join", async (data) => {
      console.log("🔥 JOIN RECEIVED:", data);
      const { userId, userType } = data;
      try {
        if (userType === "user") {
          const user = await userModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
           { returnDocument: "after" }, // Return the updated document
          );
          console.log("✅ UPDATED USER:", user.socketId);
        } else if (userType === "captain") {
          const captain = await captainModel.findByIdAndUpdate(
            userId,
            { socketId: socket.id },
            { returnDocument: "after" },
          );
          console.log("✅ Captain socketId updated:", captain);
        }
      } catch (error) {
        console.error("❌ Failed to update socketId:", error);
      }
    });

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      console.log(`User ${userId} updated to ${location}`);
      if (!location || !location.ltd || !location.lng) {
        return socket.emit("error", { message: "Invalid location data" });
      }
      await captainModel.findByIdAndUpdate(userId, {
        location: {
          ltd: location.ltd,
          lng: location.lng,
        },
      });
    });

    socket.on("disconnect", () => {
      console.log(`❌ Disconnected: ${socket.id}`);
    });
  });
}

// Move sendMessageToSocketId outside of initializeSocket
function sendMessageToSocketId(socketId, messageObject) {
  if (io) {
    io.to(socketId).emit(messageObject.event, messageObject.data);
  } else {
    console.error("Socket.io is not initialized. Call initializeSocket first.");
  }
}

module.exports = { initializeSocket, sendMessageToSocketId };
