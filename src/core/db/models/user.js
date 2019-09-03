const { Schema, model } = require("mongoose"),
  bcrypt = require("bcrypt"),
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

userSchema.pre("save", function(next) {
  next();

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

userSchema.comparePassword = function(candidatePassword) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return isMatch;
  });
};

module.exports = model("user", userSchema);
