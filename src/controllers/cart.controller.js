const { Router } = require('express')
const CartManager = require('../classes/cart-manager.class')
const ProductManager = require("../classes/product-manager.class")

const router = Router()
const prodcutMgr = new ProductManager("./src/products.json")
const cartMgr = new CartManager("./src/carts.json", prodcutMgr)

const carts = []

router.get('/', async (req, res) => {
    try {
        let carts = await cartMgr.getCarts()
        res.json({ payload: carts })
    } catch (error) {
        res.status(500).json('Pleas try leater')
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const cartProducts = await cartMgr.getProductsByCart(id)
        res.json({ payload: cartProducts })
    } catch (error) {

    }
})

router.post('/', async (req, res) => {
    const { products } = req.body
    const newCartInfo = { products }

    try {
        await cartMgr.createCart(newCartInfo)
        res.status(201).json({ Message: "The cart has been created" })
    } catch (error) {
        res.status(500).json(error.message)
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params
    const newProductInfo = {
        id: pid,
        quantity: 1
    }
    await cartMgr.addProductToCart(cid, newProductInfo)
    res.status(201).json({ message: "The product has been added" })
})

module.exports = router