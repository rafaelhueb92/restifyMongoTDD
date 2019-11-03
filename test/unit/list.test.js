const { expect } = require("chai");
const sinon = require("sinon");
const userService = require("../../src/core/service/user.services");

describe("Teste unitário de listagem", () => {
  it("Testando lista mocada", done => {
    sinon.replace(
      userService,
      "list",
      sinon.fake.returns(new Promise(resolve => resolve([{}])))
    );
    userService.list().then(res => {
      expect(res).to.be.an("object");
      done();
    });
  });
});
