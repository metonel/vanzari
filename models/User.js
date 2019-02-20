const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//

const UserSchema = new Schema({
  nume: {
    type: String,
    required: true
  },
  type: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  comision: {
    type: String
  },
  data: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("useri", UserSchema);
