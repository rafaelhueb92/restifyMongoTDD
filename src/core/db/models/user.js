const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose"),
  SALT_WORK_FACTOR = 10;
const userSchema = new Schema(
  {
    name: String,
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    role: String
  },
  {
    timestamps: true
  }
);

const repo = require("../repo");

userSchema.pre("save", function(next) {

  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      this.password = hash;
      next();
    });
  });
});

const Model = model("user", userSchema);
//module.exports = Model;
module.exports = repo(Model);
