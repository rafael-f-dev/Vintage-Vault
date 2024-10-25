const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

class Payment {

   async create_checkout_session(req,res) {
    const domain = "http://localhost:3000";
    const { cart } = req.body;
    
    try {
      if (!cart || cart.length < 1) {
        return res.send({ok:false, data:"Atleast 1 product is needed"})
      }

      const line_items = cart.map(product => ({
        price_data: {
            currency: 'eur',
            product_data: {
                name: product.name,
                description: product.description,
                images: [product.image], 
            },
            unit_amount: product.price * 100,
        },
        quantity: product.quantity,
    }));

      const session = await stripe.checkout.sessions.create({
               payment_method_types: ['card'],
               line_items,
               mode: 'payment',
               success_url: `${domain}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
               cancel_url: `${domain}/payment/error`,
           });
       return res.send({ok: true, sessionId: session.id})
    } catch (err) {
       console.log(err);
       return res.send({ok: false, data: "Something went wrong", err})
    }
  }

  async checkout_session(req,res) {
    try {
       const { sessionId } = req.query;
       const session = await stripe.checkout.sessions.retrieve(sessionId);
       return res.send({ok:true, session})
    } catch (err) {
       console.log(err)
       return res.send({ok: false, data: "Something went wrong", err})
    }
  }


}

module.exports = new Payment();