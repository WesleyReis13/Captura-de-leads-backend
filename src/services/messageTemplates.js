const messageTemplates = {
  WELCOME_MESSAGE: (name, objective, routine, tags, checkoutUrl) => {
    
    let message = `Olá ${name}! 👋 `;

    
    if (tags.includes('lead-emagrecimento')) {
      message += `Vi que seu objetivo é *emagrecer*. Tenho um guia exclusivo sobre alimentação para perda de gordura!`;
    } else if (tags.includes('lead-ganho-massa')) {
      message += `Vi que seu objetivo é *ganhar massa muscular*. Preparei um material especial sobre hipertrofia para você!`;
    } else {
      message += `Vi que seu objetivo é *${objective}*. Isso é excelente!`;
    }

    
    if (tags.includes('lead-iniciante')) {
      message += `\n\nComo você está começando agora, vou te enviar um plano inicial bem tranquilo para você evoluir com segurança!`;
    } else if (tags.includes('lead-avancado')) {
      message += `\n\nPercebi que você já tem experiência. Vou preparar um plano mais desafiador para levar seus resultados ao próximo nível!`;
    }

    
    message += `\n\n🎯 *CONHEÇA NOSSOS PLANOS:*\n`;
    message += `• Plano Essencial - R$ 97/mês\n`;
    message += `• Plano Avançado - R$ 197/mês\n`;
    message += `• Plano Premium - R$ 297/mês\n\n`;
    message += `📲 *Acesse aqui para ver todos os benefícios e escolher seu plano:*\n`;
    message += `${checkoutUrl}`;

    return message;
  },

  
  FOLLOW_UP_MESSAGE: (name, checkoutUrl) => {
    return `Olá ${name}! 😊\n\nLembra que você demonstrou interesse em melhorar seus resultados? Não deixe essa oportunidade passar!\n\n📲 *Acesse agora e escolha seu plano:*\n${checkoutUrl}\n\nQualquer dúvida, estou aqui!`;
  }
};

module.exports = messageTemplates;