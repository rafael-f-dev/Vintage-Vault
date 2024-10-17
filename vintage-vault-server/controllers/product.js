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
        let { productname, productprice, productdesc, productcat } = req.body;
        try{
            await Products.create({name:productname,price:productprice,description:productdesc,category:productcat});
            res.send({ok:true, data: `${productname} added successfully.`});
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

    async update (req, res){
        let { oldproduct, newproduct } = req.body;
        try{
            await Products.updateOne(
                { oldproduct },{ name:newproduct }
             );
            res.send({ok:true, data:`Product ${oldproduct} updated to ${newproduct} successfully`});
        }
        catch(err){
            res.send({err});
        };
    }
}
	


module.exports = new Product();