const Products = require('../models/products.js')


class Product {

   async findAll(req,res) {
       try{
           const products = await Products.find({});
           res.send(products);
       }
       catch(err){
           res.send({err})
       }
    }

   async insert (req, res) {
        let { name, price, description, image, category, quantity, onstock } = req.body;
        try{
            await Products.create({name, price, description, image, category, quantity, onstock});
            res.send({ok:true, data: `${name} added successfully.`});
        }
        catch(err){
            res.send({err});
        }
    }

    async delete (req, res) {
        let { product } = req.body;
        try{
            await Products.deleteOne({name:product});
            res.send({ok:true, data: `${product} removed successfully.`});
        }
        catch(err){
            res.send({err});
        }
    }

    async updateStock (req, res){
        let { product, newstock } = req.body;
        try{
            await Products.updateOne(
                { product },{ onstock:newstock }
             );
            res.send({ok:true, data:`Product ${product} stock updated to ${newstock} successfully`});
        }
        catch(err){
            res.send({err});
        };
    }

    async findCategory (req, res) {
        let { category } = req.body;
        try {
            const product = await Products.find({ category: category })
            res.send({ok:true, data: product})
        }
        catch(error){
            res.send({ok:false, data: `Category ${category} does not exist`});
        };
    }

    async findID (req, res) {
        let { id } = req.params;
        try {
            const product = await Products.findOne({ _id: id })
            res.send(product)
        }
        catch(error){
            res.send({ok:false, data: `Product id ${id} does not exist`});
        };
    }

}
	


module.exports = new Product();