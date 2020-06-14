const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({

  data: {
    widgets: [
      {
        context: {
          template: String

        },
        subdata: {
          Description: String,
          Image: String,
          price: Number

        },
        itemid: {
          type: mongoose.Schema.Types.ObjectId,

          ref: 'Item'
        }
      }
    ],


  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,

    ref: 'User'

  },

  Quantity: { type: Number, default: 0 },
  totalPrice: { type: Number, default: 0 }



})


userSchema.methods.insertCart = async function (widget) {

  const cart = this
  cart.data.widgets.push(widget)

  cart.Quantity = cart.Quantity + 1
  await cart.save()

}







const Cart = mongoose.model('Cart', userSchema)
module.exports = Cart
