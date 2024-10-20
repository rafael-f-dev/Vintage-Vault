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
        let { name, price, description, image, category, quantity } = req.body;
        try{
            await Products.create({name, price, description, image, category, quantity});
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

    async updateName (req, res){
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

    async findCategory (req, res) {
        let { category } = req.params;
        try {
            const product = await Products.find({ category: category })
            res.send({ok:true, data: product})
        }
        catch(error){
            res.send({ok:false, data: `Category ${category} does not exist`});
        };
    }

}
	


module.exports = new Product();