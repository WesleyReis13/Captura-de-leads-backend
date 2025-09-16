
const messageTemplates = require('./messageTemplates');
const { addWelcomeMessageJob } = require('./queue.producer');

class MessageService {
  static async sendWelcomeMessage(leadData) {
    const { phone, name, objective, routine, tags } = leadData;
    return await addWelcomeMessageJob(`${phone}@c.us`, name, objective, routine, tags);
  }

  
}

module.exports = MessageService;