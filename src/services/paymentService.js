const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { PRICE_IDS } = require('./stripeService'); 

async function handleSuccessfulPayment(session) {
  try {
    const { metadata } = session;
    const leadId = metadata?.leadId ? parseInt(metadata.leadId) : null;
    const planType = metadata?.planType;

    console.log(`✅ Pagamento aprovado para lead: ${leadId}, Plano: ${planType}`);

    const priceId = PRICE_IDS[planType];
    if (!priceId) {
      throw new Error(`PriceId não encontrado para o plano: ${planType}`);
    }

    console.log(`💰 PriceId: ${priceId}`);

    
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: 'cliente',
        plan_type: planType,
        updatedAt: new Date()
      }
    });

    console.log(`📊 Lead atualizado para cliente: ${updatedLead.id}`);

    
    const user = await prisma.user.upsert({
      where: { leadId: leadId },
      update: {
        subscriptionStatus: 'active',
        stripeCustomerId: session.customer,
        planType: planType,
      },
      create: {
        leadId: leadId,
        stripeCustomerId: session.customer,
        subscriptionStatus: 'active',
        planType: planType,
      }
    });

    console.log(`🎉 Usuário criado/atualizado: ${user.id}`);

    
    const subscription = await prisma.subscription.create({
      data: {
        userId: user.id,
        stripeSubscriptionId: session.subscription,
        status: 'active',
        priceId: priceId,
        /*planType: planType,*/
      }
    });

    console.log(`📅 Subscription criada: ${subscription.id}`);
    console.log(`🎯 Status: ${subscription.status}, PriceId: ${subscription.priceId}`);

    console.log('🎊🎊🎊 PAGAMENTO PROCESSADO COM SUCESSO! 🎊🎊🎊');

  } catch (error) {
    console.error('❌ Erro ao processar pagamento:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

module.exports = { handleSuccessfulPayment };