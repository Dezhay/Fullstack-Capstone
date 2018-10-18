'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {type: String, default: ''},
  email: {type: String, default: ''}
});

const postSchema = mongoose.Schema({
  type: {
    type: String, 
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    fullName: this.fullName || '',
    email: this.email || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);

const Post = mongoose.model('Post', postSchema);

module.exports = {User, Post};
