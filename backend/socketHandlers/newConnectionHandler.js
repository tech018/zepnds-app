const serverStore = require("../serverStore");

const newConnectionHandler = async (socket, io) => {
  const userConnected = socket.user;

  serverStore.addNewConnectedUser({
    socketId: socket.id,
    userId: userConnected.id,
  });
};

module.exports = newConnectionHandler;
