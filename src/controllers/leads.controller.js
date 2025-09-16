
const { addWelcomeMessageJob } = require('../services/queue.producer');

async function createLead(req, res) {
  try {
    const { name, email, whatsapp, objective, routine } = req.body;

    
    const newLead = await prisma.lead.create({
      data: { name, email, phone: whatsapp, objective, routine }
    });

    
    await addWelcomeMessageJob(
      `${whatsapp}@c.us`, 
      name, 
      objective, 
      routine
    );

    res.status(201).json({ message: 'Lead criado com sucesso!', lead: newLead });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}