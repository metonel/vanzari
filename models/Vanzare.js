const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VanzareSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "useri"
  },
  produs: {
    type: String,
    required: true
  },
  pret: {
    type: Number,
    required: true
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = Vanzare = mongoose.model("vanzari", VanzareSchema);
