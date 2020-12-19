const mongoose = require('mongoose')

let date = new Date();

const DataSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },  
  year: {
    type: String,
    default: date.getFullYear(),
  },
  month: {
    type: String,
    default: date.getMonth(),
  },
  date: {
    type: String,
    default: date.getDate(),
  },
  day: {
    type: String,
    default: date.getDay(),
  },
  hours: {
    type: String,
    default: date.getHours(),
  },
  minutes: {
    type: String,
    default: date.getMinutes(),
  },
  seconds: {
    type: String,
    default: date.getSeconds(),
  },
})

const DataDevice1 = mongoose.model('DataDevice1', DataSchema)

module.exports = DataDevice1
