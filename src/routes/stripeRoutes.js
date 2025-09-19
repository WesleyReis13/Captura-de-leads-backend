const express = require('express');
const router = express.Router();
const { stripe, PRICE_IDS } = require('../services/stripeService');

router.post('/create-checkout-session', async (req, res) => {
  try {
    const { planType, customerEmail, leadId } = req.body;

    
    const validPlans = ['ESSENTIAL', 'ADVANCED', 'PREMIUM'];
    if (!validPlans.includes(planType)) {
      return res.status(400).json({ error: 'Tipo de plano inválido' });
    }

    
    const priceId = PRICE_IDS[planType];
    if (!priceId) {
      return res.status(500).json({ error: 'Configuração de preço não encontrada' });
    }

    
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      metadata: { 
        leadId: leadId.toString(),
        planType: planType
      },
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ 
      url: session.url, 
      sessionId: session.id,
      planType: planType
    });

  } catch (error) {
    console.error('Erro ao criar sessão do Stripe:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

module.exports = router;