const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique:true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },

tokens:[{
token:{
type:String,
 required: true,

}


}],

avatar:
{
type:Buffer

}

},{
timestamps:true

})
userSchema.virtual('cart',{
    ref: 'Cart',
    localField: '_id',
    foreignField: 'owner'

},
)




userSchema.methods.toJSON= function()
{
user=this
const userObject=user.toObject()
delete userObject.password
delete userObject.tokens
delete userObject.avatar
return userObject
}

//appicable to instance of model
userSchema.methods.generateToken=async function()
{
const user=this
//sign takes object which is unquie identifer
const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
//token array to keep tracks of token so that user can logged in from multiple devices
user.tokens= user.tokens.concat({token})
await user.save()
return token
}

//creates new dbmethod appicable to mode
userSchema.statics.findByCredtional=async (email,password)=>{

 const user =await User.findOne({email})
    if(!user)
     throw new Error(`unable to login by 1 email invaild expected${user.email} provided ${email}`)
      
    const isMatch=bcrypt.compare(password,user.password)

   if(!isMatch)
    throw new Error('unable to login by 2')
      

  return user

}

userSchema.pre('save',async function(next)
{ 
//gives acces to  individual user before saving
const user =this
   if(user.isModified('password'))
      user.password= await bcrypt.hash(user.password,8)

next()

}


)
const User = mongoose.model('User',userSchema )

module.exports = User
