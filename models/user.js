const { Schema, model } = require("mongoose");

const Hmm = require("./Hmm");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, "Invalid email address"],
    },
    hmms: [{ type: Schema.Types.ObjectId, ref: "Hmm" }],
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { toJSON: { virtuals: true, getters: true }, id: false }
);

UserSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

UserSchema.pre("remove", function (next) {
  Hmm.remove({ username: this.username }).exec();
  next();
});

module.exports = model("User", UserSchema);
