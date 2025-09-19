
const Stripe = require('stripe');


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const PRICE_IDS = {
  ESSENTIAL: process.env.STRIPE_PRICE_ESSENTIAL,
  ADVANCED: process.env.STRIPE_PRICE_ADVANCED, 
  PREMIUM: process.env.STRIPE_PRICE_PREMIUM
};


module.exports = { stripe, PRICE_IDS };