const express = require('express');
const router = express.Router();
const { addWelcomeMessageJob } = require('../services/queue.producer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
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

        
        /*await addWelcomeMessageJob(
            `${whatsapp}@c.us`, 
            name, 
            objective, 
            routine,
            tags
        );*/

        await MessageService.sendWelcomeMessage({
            phone: whatsapp,
            name,
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

module.exports = router;