const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function handleSuccessfulPayment(session) {
  try {
    const { metadata } = session;
    const leadId = metadata?.leadId ? parseInt(metadata.leadId) : null;
    const planType = metadata?.planType; // 🔽 CAPTURAR O PLANO

    console.log(`✅ Pagamento aprovado para lead: ${leadId}, Plano: ${planType}`);

    // 1. PRIMEIRO: Atualizar o LEAD para cliente + salvar plano
    const updatedLead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        status: 'cliente',           // 🔽 MUDAR STATUS
        plan_type: planType,         // 🔽 SALVAR PLANO
        updated_at: new Date()
      }
    });

    console.log(`📊 Lead atualizado para cliente: ${updatedLead.id}`);

    // 2. DEPOIS: Criar/atualizar User (se necessário)
    const user = await prisma.user.upsert({
      where: { leadId: leadId },
      update: {
        subscriptionStatus: 'active',
        stripeCustomerId: session.customer,
        planType: planType,          // 🔽 SALVAR PLANO AQUI TAMBÉM
      },
      create: {
        leadId: leadId,
        stripeCustomerId: session.customer,
        subscriptionStatus: 'active',
        planType: planType,          // 🔽 SALVAR PLANO AQUI TAMBÉM
      }
    });

    console.log(`🎉 Usuário criado/atualizado: ${user.id}, Plano: ${planType}`);

  } catch (error) {
    console.error('❌ Erro ao processar pagamento:', error.message);
    // 🔽 LOG MAIS DETALHADO PARA DEBUG
    console.error('Session metadata:', session.metadata);
    console.error('LeadId tentado:', session.metadata?.leadId);
  }
}

module.exports = { handleSuccessfulPayment };