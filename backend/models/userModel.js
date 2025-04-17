const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
  //validation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  if(!validator.isEmail(email)){
    throw Error('Email is not valid');

  }
  if(!validator.isStrongPassword(password)){
    throw Error('Password not strong enough');
  }


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
//statics method to login user

userSchema.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  //check if user already exists
  const user = await this.findOne({ email });

  if (!user) {
    throw Error('In correct email');
  }

  const match = await bcrypt.compare(password,user.password)

  if (!match) {
    throw Error('Incorrect password');
  }
  return user;

}
module.exports=mongoose.model('User', userSchema);