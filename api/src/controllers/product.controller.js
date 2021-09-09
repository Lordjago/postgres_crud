const db = require('../config/database');

const Product = require('../model/product');

exports.createProduct = async (req, res) => {
    const product_name = req.body.product_name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const product = new Product (product_name, quantity, price);
    product
    .save()
    .then((products) => {
        res.status(201).send({
            message: "Product added successfully!",
            body: {
            product: { product_name, quantity, price }
        },
        });
    })
    .catch((err) => {
        console.log(err);
    });
};


exports.getAllProducts = async (req, res) => {
    // const row = await db.query("SELECT * FROM products ORDER BY productname ASC");
    Product.getProducts()
    .then((products) => {
         if (products.rows.length == 0) return res.status(404).send('Product with id does not exist');
         res.status(201).send({
            message: "All products!",
            product: products.rows
    });
    })
    .catch((err) => {
            console.log(err);
        });
   
}

exports.getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    // const row = await db.query("SELECT * FROM products WHERE productid = $1", [id]);
    Product.getProductById (id)
        .then((product) => {
            if (product.rows.length == 0) return res.status(404).send('Product with id does not exist');
            return res.status(201).send({
                message: "Product Found!",
                product: product.rows
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postUpdate = async(req, res) => {
    const id = parseInt(req.params.id);
    const product = {
        product_name : req.body.product_name,
        quantity : req.body.quantity,
        price : req.body.price
    }

    Product.updateProduct(id, product)
    .then(() => {
        res.status(201).send({
        message: "Update Successful!"
    });
    })
    .catch((err) => {
        console.log(err);
    });
    // console.log(row);
    
}

exports.postDelete = async (req, res) => {
    const id = parseInt(req.params.id);
    Product.deleteProduct(id)
        .then(() => {
            res.status(201).send({
                message: "Delete Successful!"
            });
        })
        .catch((err) => {
            console.log(err);
        });
}