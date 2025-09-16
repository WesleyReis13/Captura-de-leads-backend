
const { Queue } = require('bullmq');
const Redis = require('redis');
const messageTemplates = require('./messageTemplates');


const redisConnection = {
    host: 'localhost',
    port: 6379
};


const messageQueue = new Queue('whatsapp-messages', { connection: redisConnection });


async function addWelcomeMessageJob(to, name, objective, routine, tags) {
  const jobName = 'send-welcome-message'; 

  

  const messageText = messageTemplates.WELCOME_MESSAGE(name, objective, routine, tags);
  
  try {
    const job = await messageQueue.add(jobName, {
      to,
      text: messageText
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