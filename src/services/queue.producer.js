
const { Queue } = require('bullmq');
const Redis = require('redis');


const redisConnection = {
    host: 'localhost',
    port: 6379
};


const messageQueue = new Queue('whatsapp-messages', { connection: redisConnection });


async function addMessageToQueue(to, text, jobName = 'send-message') {
    try {
        const job = await messageQueue.add(jobName, { to, text });
        console.log(`📤 Job ${job.id} adicionado na fila para ${to}`);
        return job;
    } catch (error) {
        console.error('Erro ao adicionar job na fila:', error);
        throw error;
    }
}

module.exports = { addMessageToQueue, messageQueue };