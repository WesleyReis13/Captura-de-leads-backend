
const express = require('express');
const router = express.Router();
const {stripe} = require('../services/stripeService');
const { handleSuccessfulPayment } = require('../services/paymentService');

router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  let event;
  const signature = req.headers['stripe-signature'];
  
  try {
    
    const webhookSecret = process.env.NODE_ENV === 'production' 
      ? process.env.STRIPE_WEBHOOK_SECRET 
      : process.env.STRIPE_DEV_WEBHOOK_SECRET;

    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    
  } catch (error) {
    console.error('❌ Erro na verificação do webhook:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }


  
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulPayment(session);
      break;

    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      await handleSubscriptionCancelled(subscription);
      break;

    
    default:
      console.log(`🔔 Evento não tratado: ${event.type}`);
  }

  
  res.json({received: true});
});

module.exports = router;