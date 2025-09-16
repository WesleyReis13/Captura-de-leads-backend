
const messageTemplates = {
  WELCOME_MESSAGE: (name, objective, routine, tags) => {
    
    let message = `Olá ${name}! 👋 `;

    
    if (tags.includes('lead-emagrecimento')) {
      message += `Vi que seu objetivo é *emagrecer*. Tenho um guia exclusivo sobre alimentação para perda de gordura!`;
    } else if (tags.includes('lead-ganho-massa')) {
      message += `Vi que seu objetivo é *ganhar massa muscular*. Preparei um material especial sobre hipertrofia para você!`;
    } else {
      message += `Vi que seu objetivo é *${objective}*. Isso é excelente!`;
    }

    
    if (tags.includes('lead-iniciante')) {
      message += `\n\nComo você está começando agora, vou te enviar um plano inicial bem tranquilo!`;
    }

    return message;
  }
};

module.exports = messageTemplates;