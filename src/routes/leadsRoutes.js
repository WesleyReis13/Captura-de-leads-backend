const express = require('express');
const router = express.Router();


router.post('/leads', (req, res) => {
    const { name, email, whatsapp } = req.body;
    
    if (!name || !email || !whatsapp) {
        return res.status(400).json({
            error: 'Nome, email e whatsapp são obrigatórios'
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        whatsapp,
        createdAt: new Date()
    };

    res.status(201).json({
        message: 'Lead criado com sucesso',
        user: newUser
    });
});

module.exports = router;