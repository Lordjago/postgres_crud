const db = require('../config/database');

exports.createProduct = async (req, res) => {
    const product_name = req.body.product_name;
    const quantity = req.body.quantity;
    const price = req.body.price;
    const { rows } = await db.query(
        "INSERT INTO products (productname, quantity, price) VALUES ($1, $2, $3)",
        [product_name, quantity, price]
    );

    res.status(201).send({
        message: "Product added successfully!",
        body: {
            product: { product_name, quantity, price }
        },
    });
};


exports.getAllProducts = async (req, res) => {
    const row = await db.query("SELECT * FROM products ORDER BY productname ASC");
    res.status(201).send({
        message: "All products!",
        product: row.rows
    });
}

exports.getProductById = async (req, res) => {
    const id = parseInt(req.params.id);
    const row = await db.query("SELECT * FROM products WHERE productid = $1", [id]);
    res.status(201).send({
        message: "Product!",
        product: row.rows
    });
}

exports.postUpdate = async(req, res) => {
    const id = parseInt(req.params.id);
    const product_name = req.body.product_name;
    const quantity = req.body.quantity;
    const price = req.body.price;

    const row = await db.query("UPDATE products SET productname = $1, quantity = $2, price = $3 WHERE productid = $4", [product_name, quantity, price, id]);
    console.log(row);
    res.status(201).send({
        message: "Update Successful!"
    });
}

exports.postDelete = async (req, res) => {
    const id = parseInt(req.params.id);
    const row = await db.query("DELETE FROM products WHERE productid = $1", [id]);
    res.status(201).send({
        message: "Delete Successful!"
    });
}