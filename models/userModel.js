const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    userName: {
      type: String,
      require: [true, "Please add a user name"],
    },
    email: {
      type: String,
      require: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
    },
    roleId: {
      type: Schema.Types.ObjectId,
      ref: 'Role'
    },
    storeId: {
      type: Schema.Types.ObjectId,
      ref: 'Store',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model('User', userSchema);
