// src/services/messageTemplates.js

const messageTemplates = {
  // Template para mensagem de boas-vindas
  WELCOME_MESSAGE: (name, objective, routine) => {
    return `Olá ${name}! 👋 
Tudo bem? 
Vi que seu objetivo principal é *${objective}* e você está *${routine}*. 
Isso é excelente! Nos próximos dias vou te enviar conteúdos exclusivos sobre ${objective} para te ajudar.`;
  },

  // Template para mensagem de follow-up (exemplo futuro)
  FOLLOW_UP_1: (name) => {
    return `Ei ${name}! 😊 
Lembra que você quer melhorar seus hábitos? 
Te mandei um material super especial sobre isso no seu email!`;
  },

  // Template para mensagem de campanha (exemplo futuro)
  CAMPAIGN_PROMO: (name, discount) => {
    return `*OFERTA ESPECIAL!* 🎁
${name}, temos um desconto de ${discount}% exclusivo para você nos próximos 7 dias!`;
  }
};

module.exports = messageTemplates;