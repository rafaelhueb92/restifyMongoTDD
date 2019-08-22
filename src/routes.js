const Router = require("restify-router").Router;
const routes = new Router();
const authMiddleware = require("./app/middlewares/auth");
const sessionController = require("./app/Controllers/session.controller");
const userController = require("./app/Controllers/user.controller");

routes.post("/sessions", sessionController.store);

routes.use(authMiddleware);

routes.get("/user", userController.list);
routes.get("/user/:id", userController.findById);
routes.post("/user", userController.insert);
routes.put("/user", userController.update);
routes.del("/user", userController.delete);

module.exports = routes;
