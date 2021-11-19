const mongoose = require('mongoose');

const disciple = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, require: true},
    phone: {type: String, require: true},
    gender: {type: String, require: true},
    age_group: {type: String, require: true},
    district: {type: String, require: true},
    street: {type: String, require: true},
    number: {type: String, require: true},
    createdAt: {type: Date, default: Date.now}
})

const userSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    login: {type: String, require: true},
    name: {type: String, require: true},
    password: {type: String, require: true},
    disciples: [disciple],
    createdAt: {type: Date, default: Date.now}
})


module.exports = mongoose.model('User', userSchema);