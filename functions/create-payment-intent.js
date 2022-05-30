require('dotenv').config();
const stripe=require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY)

exports.handler = async function (event,context) {
    if(event.body){
        const {cart,shipping_fees,total_price}=JSON.parse(event.body);
        const calculateOrderAmount=()=>{
            return shipping_fees+total_price
        }
        try {
            const paymentIntent=await stripe.paymentIntents.create({
                amount:calculateOrderAmount(),
                currency:'usd'
            })
            return{
                statusCode:200,
                body:JSON.stringify({clientSecret:paymentIntent.client_secret})
            }
        } catch (error) {
            return {
                statusCode:500,
                body:JSON.stringify({message:error.message})
            }
        }
        return {
          statusCode: 200,
          body: JSON.stringify(cart),
        }
    }
    return {
        statusCode:200,
        body:'Create payment intent'
    }

  }