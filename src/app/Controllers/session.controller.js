const sessionService = require("../../core/service/session.services");

class sessionController {
  store(req, res) {
    const { email, password } = req.body;
    console.log("Begin Session", email, password);
    return sessionService.store(email, password).then(resp => {
      if (resp.message) return res.status(401).json(resp);
      else return res.json(resp);
    });
  }
}

module.exports = new sessionController();
