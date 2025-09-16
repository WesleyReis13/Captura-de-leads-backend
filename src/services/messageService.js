// src/services/messageService.js
const messageTemplates = require('./messageTemplates');
const { addWelcomeMessageJob } = require('./queue.producer');

class MessageService {
  static async sendWelcomeMessage(leadData) {
    const { phone, name, objective, routine } = leadData;
    return await addWelcomeMessageJob(`${phone}@c.us`, name, objective, routine);
  }

  // Adicione outros métodos no futuro:
  // static async sendFollowUp(leadData) { ... }
  // static async sendCampaign(leadData, campaignData) { ... }
}

module.exports = MessageService;