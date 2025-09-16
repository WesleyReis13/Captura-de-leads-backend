
const { Queue } = require('bullmq');
const Redis = require('redis');


const redisConnection = {
    host: 'localhost',
    port: 6379
};


const messageQueue = new Queue('whatsapp-messages', { connection: redisConnection });


async function addWelcomeMessageJob(to, name, objective, routine) {
  const jobName = 'send-welcome-message'; 

  
  const personalizedText = `Olá ${name}! 👋 
Tudo bem? 
Vi que seu objetivo principal é *${objective}* e você está *${routine}*. 
Isso é excelente! Nos próximos dias vou te enviar conteúdos exclusivos sobre ${objective} para te ajudar.`;

  try {
    const job = await messageQueue.add(jobName, {
      to,
      text: personalizedText
    });
    console.log(`📤 Job de boas-vindas (${job.id}) adicionado na fila para ${to}`);
    return job;
  } catch (error) {
    console.error('❌ Erro ao adicionar job de boas-vindas:', error);
    throw error;
  }
}


module.exports = { 
  addWelcomeMessageJob, 
  messageQueue 
};