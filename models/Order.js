const {Schema, model} = require('mongoose')

const schema = new Schema({
  date: {type: Date, default: Date.now},
  number: {type: Number, required: true},
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  goods: [{type: Array, required: true}],
  phone: {type: Number, required: true},
  email: {type: String},
  address: {type: String, required: true},
  homeNumber: {type: String, required: true},
  total: {type: Number, required: true},
  totalWeight: {type: Number, required: true},
  totalPrice: {type: Number, required: true},
  status: {type: String, required: true},
  comment: {type: String}
})

module.exports = model('Order', schema)
