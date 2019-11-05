var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = new Schema({
  Word : {
      type : String,
      required :  true
  }
});

let Word = mongoose.model('Palindrome' , WordSchema)


module.exports = Word

