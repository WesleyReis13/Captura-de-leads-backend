const MessageService = require("../services/messageService");

module.exports = async (job) => {
  const { name, phone, message, campaignId } = job.data;
  console.log(`Enviando mensagem da campanha ${campaignId} para ${name}`);

  try {
    await MessageService.sendCampaignMessage({ phone, name, message });
    console.log(`Mensagem enviada com sucesso para ${phone}`);
  } catch (err) {
    console.error(`Erro ao enviar mensagem para ${phone}:`, err);
    throw err;
  }
};
