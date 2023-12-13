const productsController = require("../controllers/product.controller")
const cartsController = require("../controllers/cart.controller")
const router = app => {
    //console.log('Rotuer user')
    app.use('/api/products', productsController)
    app.use('/api/carts', cartsController)
}

module.exports = router