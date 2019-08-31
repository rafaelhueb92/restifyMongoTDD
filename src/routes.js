const authMiddleware = require("./app/middlewares/auth");
const sessionController = require("./app/Controllers/session.controller");
const userController = require("./app/Controllers/user.controller");

module.exports = server => {
  server.post("/sessions", sessionController.store);

  server.use(authMiddleware);

  server.get("/user", userController.list);
  server.get("/user/:id", userController.findById);
  server.post("/user", userController.insert);
  server.put("/user", userController.update);
  server.del("/user", userController.delete);
};
