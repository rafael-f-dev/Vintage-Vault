const Products = require('../models/products.js')


class Product {

   async findAll(req,res) {
       try{
           const products = await Products.find({});
           res.send(products);
       }
       catch(e){
           res.send({e})
       }
    }

   async insert (req, res) {
        let { productname, productprice, productdesc, productcat } = req.body;
        try{
            const done = await Products.create({name:productname,price:productprice,description:productdesc,category:productcat});
            res.send({ok:true, data: `${productname} added successfully.`})
        }
        catch(e){
            res.send({e})
        }
    }

    async delete (req, res) {
        let { product } = req.body;
        try{
            const removed = await Products.deleteOne({name:product});
            res.send({ok:true, data: `${product} removed successfully.`})
        }
        catch(e){
            res.send({e})
        }
    }
}
	


module.exports = new Product();