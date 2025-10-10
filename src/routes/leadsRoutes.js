const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { addWelcomeMessageJob } = require('../services/queue.producer');
const MessageService = require('../services/messageService');
const { generateTagsFromLead } = require('../services/tagService');


router.post('/leads', async (req, res) => {
    try {
        const { name, email, whatsapp, objective, routine } = req.body;

        const tags = generateTagsFromLead({ objective, routine });

        if (!name || !email || !whatsapp || !objective || !routine) {
            return res.status(400).json({
                error: 'Todos os campos são obrigatórios: nome, email, whatsapp, objetivo e rotina.'
            });
        }

        const newLead = await prisma.lead.create({
            data: {
                name,
                email,
                phone: whatsapp,
                objective,    
                routine,
                tags       
            }
        });

        console.log('📝 Lead criado no banco:', newLead);

        
        await MessageService.sendWelcomeMessage({
            id: newLead.id,       
            phone: whatsapp,
            name,
            email: email,          
            objective,
            routine,
            tags
        });

        res.status(201).json({
            message: 'Lead criado com sucesso!',
            lead: newLead,
            tags
        });

    } catch (error) {
        console.error('Erro ao criar lead:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});


router.get('/leads', async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          include: { subscriptions: true }
        }
      }
    });

    const leadsWithStatus = leads.map(lead => {
      const activeSub = lead.user?.subscriptions.find(sub => sub.status === 'active');

      return {
        ...lead,
        isClient: !!activeSub,
        plan: activeSub?.priceId || null
      };
    });

    res.json(leadsWithStatus);
  } catch (error) {
    console.error('Erro ao buscar leads:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


module.exports = router;
