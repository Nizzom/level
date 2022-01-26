const {Schema, model} = require('mongoose')

const schema = new Schema({
  date: {type: Date, default: Date.now},
  brand: {type: String, required: true},
  color: {type: String, required: true},
  colorHex: {type: String, required: true},
  sizes: [{type: String, required: true}],
  aviable: {type: Boolean, required: true},
  name: {type: String, required: true},
  type: {type: String, required: true},
  categorie: {type: String, required: true},
  price: {type: Number, required: true},
  pol: {type: Boolean, required: true},
  description: {type: String, required: true},
  weight: {type: Number},
})
schema.index({'$**': 'text'});

module.exports = model('Good', schema)
