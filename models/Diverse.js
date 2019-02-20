const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiverseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "useri"
  },
  continut: {
    type: String,
    required: true
  },
  modifVanzare: {
    type: Boolean
    //default: false
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = Diverse = mongoose.model("diverse", DiverseSchema);
