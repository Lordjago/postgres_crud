const db = require('../config/database');

class Product {
    constructor(product_name, quantity, price) {
        this.product_name = product_name;
        this.quantity = quantity;
        this.price = price;
    };

    async save() {
        return await db.query(
            "INSERT INTO products (productname, quantity, price) VALUES ($1, $2, $3)",
            [this.product_name, this.quantity, this.price]
        );
    }
        

    static async getProducts () {
       return await db.query("SELECT * FROM products ORDER BY productname ASC");
    }

    static async getProductById(id) {
        return await db.query("SELECT * FROM products WHERE productid = $1", [id]);
    }
    
    static async updateProduct (id, updatedData) {
       return  await db.query("UPDATE products SET productname = $1, quantity = $2, price = $3 WHERE productid = $4", [updatedData.product_name, updatedData.quantity, updatedData.price, id]);
       
    }

    static async deleteProduct(id) {
        return await db.query("DELETE FROM products WHERE productid = $1", [id]);
    }

}

module.exports = Product;