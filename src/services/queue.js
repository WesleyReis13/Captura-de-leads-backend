const Queue = require("bull");
const sendCampaignMessageJob = require("../jobs/sendCampaignMessage.job");

const campaignQueue = new Queue("campaignQueue", {
  redis: { host: "localhost", port: 6379 },
});

campaignQueue.process("send-campaign-message", sendCampaignMessageJob);

module.exports = { campaignQueue };
