
const messageTemplates = require('./messageTemplates');
const { addWelcomeMessageJob,addCampaignMessageJob } = require('./queue.producer');

class MessageService {
  static async sendWelcomeMessage(leadData) {
    const { id, phone, name, objective, routine, tags, email } = leadData;

    return await addWelcomeMessageJob(`${phone}@c.us`, name, objective, routine, tags, id, email);
  }

  
  static async sendCampaignMessage(leadData) {
    const { phone, name, message, sendAt, campaignId } = leadData;

    
    const cleaned = String(phone).trim();
    const jid = cleaned.includes('@') ? cleaned : `${cleaned.replace(/\D/g, '')}@c.us`;

    return await addCampaignMessageJob({
      phone: jid,      
      name,
      message,
      sendAt,
      campaignId
    });
  }
  
}

module.exports = MessageService;