const router = require('express-promise-router')();
const productController = require('../controllers/product.controller.js');


//'Product': (POST): localhost:3000/api/products
router.post('/products', productController.createProduct);

router.get('/all', productController.getAllProducts);

router.get('/product/:id', productController.getProductById);

router.post('/product/:id', productController.postUpdate);

router.post('/delete/:id', productController.postDelete);

module.exports = router;