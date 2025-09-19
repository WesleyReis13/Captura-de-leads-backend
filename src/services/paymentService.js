const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function handleSuccessfulPayment(session) {
  try {
    const { metadata } = session;
    const leadId = metadata?.leadId ? parseInt(metadata.leadId) : null;

    console.log(`✅ Pagamento aprovado para lead: ${leadId}`);

    
    const leadExists = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!leadExists) {
      throw new Error(`Lead com ID ${leadId} não encontrado. Criar sessão com leadId válido.`);
    }

    
    const user = await prisma.user.upsert({
      where: { leadId: leadId },
      update: {
        subscriptionStatus: 'active',
        stripeCustomerId: session.customer
      },
      create: {
        leadId: leadId,
        stripeCustomerId: session.customer,
        subscriptionStatus: 'active'
      }
    });

    console.log(`🎉 Usuário criado/atualizado: ${user.id}`);

  } catch (error) {
    console.error('❌ Erro ao processar pagamento:', error.message);
  }
}

module.exports = { handleSuccessfulPayment };