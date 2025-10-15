import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});

let playerScores = [];
io.on("connection", (socket) => {
  socket.on("scores", (scores) => {
    console.log(scores);
    playerScores.push(scores);


    socket.emit("playerScores", playerScores);

    setInterval(() => {
      socket.emit("playerScores", playerScores);
    }, 1000);

    socket.on("editData", (response) => {

      let currentIndex = playerScores.findIndex((data) => data.id === response.id);
      if (currentIndex != -1) {
        playerScores[currentIndex] = { ...playerScores[currentIndex], ...response };
      }
    })

    socket.on("disconnect", (reason) => {
      console.log("user disconnected", reason);
    });

    socket.on("delete", (id) => {
      let currentIndex = playerScores.findIndex((data) => data.id === id);
      if (currentIndex != -1) {
        playerScores.splice(currentIndex, 1);
      }
    });
  });

});


httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});