const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
const socketServer = require("./socketServer");

const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const issueRoutes = require("./routes/issue.route");

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(bodyParser.text({ limit: "200mb" }));
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/issue", issueRoutes);

const server = http.createServer(app);
socketServer.registerSocketServer(server);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
