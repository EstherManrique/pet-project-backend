const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  petName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  },
  clientPhone: {
    type: Number,
    required: true
  },
  clientId: {
    type: Schema.ObjectId,
    ref: "User",
  },
  storeId: {
    type: Schema.ObjectId,
    ref: "Store",
  }, 
  serviceId: {
    type: Schema.ObjectId,
    ref: "Service",
  }
},
{
  timestamps: true,
  versionKey: false
}
);

module.exports = mongoose.model("Reservation", reservationSchema);