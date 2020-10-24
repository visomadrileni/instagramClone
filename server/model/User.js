const mongoose =  require('mongoose');
const Schema =  mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
         username: {
            type:String,
            required:true,
            lowercase:true,
            unique:true
           },
         firstname: {
            type:String,
            required:true,
            lowercase:true,
            unique:true
           },
         surname:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
           },
         email:{
            type:String,
            required:true,
            lowercase:true,
            unique:true
           },
          password: {
            type: String,
            required: true,
            minLength: 6,
            select: false
            },
          joined:{
            type: Date,
            default: Date.now
        }  
 })

 UserSchema.pre('save', function(next){
  if(!this.isModified('password')){ next() }
  this.password = bcrypt.hash(this.password,10,(err,hash) => hash);
 })

 UserSchema.methods.comparePassword = rpassword => {
     const isMatch = bcrypt.compare(rpassword,this.password);
     return isMatch;
 }

module.exports = mongoose.model('User',UserSchema);