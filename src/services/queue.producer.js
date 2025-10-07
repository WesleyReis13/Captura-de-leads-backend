const { Queue } = require('bullmq');


const redisConnection = {
  host: 'localhost',
  port: 6379
};


const messageQueue = new Queue('whatsapp-messages', { connection: redisConnection });

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
    const job = await messageQueue.add(
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
  addCampaignMessageJob,
  messageQueue
};
