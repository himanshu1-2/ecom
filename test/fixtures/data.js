const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/model/user')
const Cart = require('../../src/model/cart')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Jess',
    email: 'jess@example.com',
    password: 'myhouse099@@',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
    }]
}


const cartItem =

{
    "widgets": [
        {
            "context": {
                "template": "GreetingAndPincodeWidget"

            },
            "subdata": {
                "description": "HI, #USERNAME",
                "image": "url"

            }
        }],
    "Quantity": 1,
    "totalPrice": 0
}






const setupDatabase = async () => {
    await User.deleteMany()
    await Cart.deleteMany()
    await new User(userOne).save()
    await new Cart(cartItem).save()

}

module.exports = {
    userOneId,
    userOne,
cartItem,
    setupDatabase
}