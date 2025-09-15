const express = require('express');
const router = express.Router();
const { addMessageToQueue } = require('../services/queue.producer');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.post('/leads', async (req, res) => {
    try {
        
        const { name, email, whatsapp, objective, routine } = req.body;

        
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
                routine       
            }
        });

        
        await addMessageToQueue(
            `${whatsapp}@c.us`, 
            `Olá ${name}! 👋 Vi que seu objetivo principal é *${objective}* e você está *${routine}*. Isso é excelente! Em breve te enviaremos mais conteúdos personalizados.` // Mensagem SUPER personalizada
        );

        
        res.status(201).json({
            message: 'Lead criado com sucesso!',
            lead: newLead
        });

    } catch (error) {
        console.error('Erro ao criar lead:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

module.exports = router;