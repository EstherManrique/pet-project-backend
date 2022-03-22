const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  }
},
{
  timestamps: true,
  versionKey: false
}
);

module.exports = mongoose.model('Store', storeSchema);