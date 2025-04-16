const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
}, { timestamps: true });


//statcs method to hash password before saving user

userSchema.statics.signup = async function(email, password) {
//   //validation
//   if (!email || !password) {
//     throw Error('All fields must be filled');
//   }
//   if (!email.includes('@')) {
//     throw Error('Email is not valid');
//   }
//   if (password.length < 6) {
//     throw Error('Password must be at least 6 characters long');
//   }

  //check if user already exists
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error('Email already in use');
  }
 
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //create user
  const user = await this.create({ email, password: hash });
  
  return user;
}
module.exports=mongoose.model('User', userSchema);