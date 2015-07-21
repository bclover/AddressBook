var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var addressModel = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    address1: {type: String},
    address2: {type: String},
    city: {type: String},
    state: {type: String},
    zip: {type: String}
});

module.exports = mongoose.model('Address', addressModel);
