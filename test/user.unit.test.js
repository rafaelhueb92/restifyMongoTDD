const User = require("../src/core/service/user.service");
const { expect } = require("chai");

before(() => {
  
});

describe("user service", () => {
  it("should include the user to the schema", done => {
    const user = {
      name: "Bruce Dickson",
      email: "iron.disckon@gmail.com",
      password: "1234",
      role: "Admin"
    };

    User.insert(user).then(res => {
      expect(user.name).to.equal(res.name);
      expect(user.email).to.equal(res.email);
      expect(user.role).to.equal(res.role);
    });
    done();
  });

  it("should alter the user on the schema", done => {
    const user = {
      name: "Bruce Dickson",
      email: "iron.disckon@gmail.com",
      password: "1234",
      role: "Vocalist"
    };

    User.update(user).then(res => {
      expect(user.role).to.equal(res.role);
    });

    done();
  });

  it("should delete the user on the schema", done => {
    User.del("5d6e9e5cc54ec74b343c4c3a").then(({ deleted }) => {
      expect(deleted).to.equal(true);
    });
    done();
  });

  it("should retrieve the users from the schema", done => {
    const users = [
      {
        name: "Bruce Dickson",
        email: "iron.disckon@gmail.com",
        password: "1234",
        role: "Vocalist"
      }
    ];

    User.list().then(res => {
      expect(res).to.equal(users);
    });
    done();
  });

  //5d6ea01d71b8863d080354c6

  it("should retrieve the users from the schema", done => {
    User.findById("5d6ea01d71b8863d080354c6").then(res => {
      expect(res.name).to.equal("Jon Jones");
    });
    done();
  });
});
