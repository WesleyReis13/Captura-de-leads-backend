
const { addMessageToQueue } = require('../services/queue.producer');

async function createLead(req, res) {
    try {
        const { name, phone, objective } = req.body;

       
        await addMessageToQueue(
            `${phone}@c.us`, 
            `Olá ${name}! Vi que seu objetivo é ${objective}. 👋` 
        );

        res.json({ success: true, message: 'Lead criado e mensagem enfileirada!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}