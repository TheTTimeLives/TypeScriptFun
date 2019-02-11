var mongoose = require('mongoose')

// Save a reference to the Schema constructor
let Schema = mongoose.Schema

let TodoSchema = new Schema({
  time: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
})

// This creates our model from the above schema, using mongoose's model method
const ToDo = mongoose.model('ToDo', TodoSchema)

// Export the ToDo model
module.exports = ToDo
