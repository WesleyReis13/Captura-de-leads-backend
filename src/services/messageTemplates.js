

const messageTemplates = {
  
  WELCOME_MESSAGE: (name, objective, routine) => {
    return `Olá ${name}! 👋 
Tudo bem? 
Vi que seu objetivo principal é *${objective}* e você está *${routine}*. 
Isso é excelente! Nos próximos dias vou te enviar conteúdos exclusivos sobre ${objective} para te ajudar.`;
  },

  
  FOLLOW_UP_1: (name) => {
    return `Ei ${name}! 😊 
Lembra que você quer melhorar seus hábitos? 
Te mandei um material super especial sobre isso no seu email!`;
  },

  
  CAMPAIGN_PROMO: (name, discount) => {
    return `*OFERTA ESPECIAL!* 🎁
${name}, temos um desconto de ${discount}% exclusivo para você nos próximos 7 dias!`;
  }
};

module.exports = messageTemplates;