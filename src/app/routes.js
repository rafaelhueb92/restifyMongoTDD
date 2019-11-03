const authMiddleware = require("./middlewares/auth");
const sessionController = require("./Controllers/session.controller");
const userController = require("./Controllers/user.controller");

module.exports = server => {
  server.post("/sessions", sessionController.store);

  server.use(authMiddleware);

  server.get("/user", userController.list);
  server.get("/user/:id", userController.findById);
  server.post("/user", userController.insert);
  server.put("/user", userController.update);
  server.del("/user", userController.delete);
};
