const express = require('express');
const router = express.Router();
const {stripe} = require('../services/stripeService');
const { handleSuccessfulPayment } = require('../services/paymentService');

router.post('/', express.raw({type: 'application/json'}), async (req, res) => {
  let event;
  const signature = req.headers['stripe-signature'];

  console.log('🔔 Webhook recebido do Stripe');
  console.log('📧 Headers:', {
    signature: signature ? 'present' : 'missing',
    'content-type': req.headers['content-type']
  });
  
  try {
    const webhookSecret = process.env.NODE_ENV === 'production' 
      ? process.env.STRIPE_WEBHOOK_SECRET 
      : process.env.STRIPE_DEV_WEBHOOK_SECRET;

    console.log('🔐 Webhook secret configurado:', webhookSecret ? 'SIM' : 'NÃO');

    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
    console.log('✅ Webhook verificado com sucesso');
    console.log('🎯 Event type:', event.type);
    
  } catch (error) {
    console.error('❌ Erro na verificação do webhook:', error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  console.log('🔄 Processando evento:', event.type);

  switch (event.type) {
    case 'checkout.session.completed':
      console.log('💰 Evento: checkout.session.completed');
      const session = event.data.object;
      console.log('📦 Session metadata:', session.metadata);
      console.log('💳 Customer:', session.customer);
      console.log('📝 Subscription:', session.subscription);
      
      await handleSuccessfulPayment(session);
      break;

    case 'customer.subscription.deleted':
      console.log('❌ Evento: customer.subscription.deleted');
      const subscription = event.data.object;
      await handleSubscriptionCancelled(subscription);
      break;

    default:
      console.log(`🔔 Evento não tratado: ${event.type}`);
  }

  console.log('✅ Webhook processado com sucesso');
  res.json({received: true});
});

module.exports = router;