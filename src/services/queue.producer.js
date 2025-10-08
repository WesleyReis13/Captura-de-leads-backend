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

const messageBusca = new Queue('whatsapp-messages', { connection: redisConnection });

/**
 * 
 * @param {Object} messageData 
 * @param {string} messageData.name
 * @param {string} messageData.phone
 * @param {string} messageData.message
 * @param {Date} messageData.sendAt
 * @param {string} messageData.campaignId
 */
async function addCampaignMessageJob(messageData) {
  try {
    const job = await messageBusca.add(
      'send-campaign-message',
      {
        to: messageData.phone,
        name: messageData.name,
        text: messageData.message,
        sendAt: messageData.sendAt,
        campaignId: messageData.campaignId
      },
      {
        delay: Math.max(new Date(messageData.sendAt) - Date.now(), 0),
        attempts: 3,
      }
    );

    console.log(`📤 Job de campanha (${job.id}) adicionado para ${messageData.phone}`);
    return job;
  } catch (error) {
    console.error('❌ Erro ao adicionar job de campanha:', error);
    throw error;
  }
}


module.exports = { 
  addWelcomeMessageJob,
  addCampaignMessageJob, 
  messageQueue 
};