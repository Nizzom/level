const {Schema, model} = require('mongoose')

const schema = new Schema({
  cargo: {type: Number, required: true},
})

module.exports = model('Coefficient', schema)