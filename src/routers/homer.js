const Item = require('../model/item')
const Cart = require('../model/cart')
const express = require('express')
const auth = require('../middleware/auth')
const router = new express.Router()
router.post('/home', async (req, res) => {
    try {

        const items = new Item(req.body)
        await items.inserItem()

        res.status(201).send(items)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/a', auth ,async (req, res) => {
    const items = await Item.find()
    res.send(items)
})

router.post('/button', auth, async (req, res) => {
    try {
        const items = await Item.find()
        let index = parseInt(req.query.index)
        const item = items[0]
        const cartItems = new Cart({ ...item.data.widgets, owner: req.user._id })
        let price = item.data.widgets[index].subdata.price

        
        cartItems.insertCart(item.data.widgets[index])

        res.send("item ")



    }

    catch (e) {

        res.status(400).send(e)
    }



})

router.get('/cart', auth, async (req, res) => {
    try {


        await req.user.populate('cart').execPopulate()
        res.send(req.user.cart)

    }

    catch (e) {
        res.status(400).send(e)
    }



})

router.delete('/remove/:id', auth, async (req, res) => {
    try {
        const cart = await Cart.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!cart) {
            res.status(404).send()
        }

        res.send(cart)
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/removeall', auth, async (req, res) => {
    try {

        const removeCartItem = await Cart.deleteMany({owner: req.user._id })

        res.send("all")

    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router
