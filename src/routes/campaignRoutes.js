const { addCampaignMessageJob } = require("../services/queue.producer");
const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const { PrismaClient } = require("@prisma/client");

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ dest: "uploads/" });

router.post("/upload-campaign", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (data.length === 0) {
      return res.status(400).json({ error: "Planilha vazia ou inválida" });
    }

    const campaign = await prisma.campaign.create({
      data: { name: `Campanha - ${new Date().toISOString()}`, status: "pending" },
    });

    const report = [];

    for (const [index, row] of data.entries()) {
      try {
        const messageData = {
          name: row.Nome || "Sem nome",
          phone: String(row.Telefone),
          message: row.Mensagem || "",
          sendAt: row.DataEnvio ? new Date(row.DataEnvio) : new Date(),
          campaignId: campaign.id,
        };

        
        await addCampaignMessageJob(messageData);

        
        report.push({
          row: index + 1,
          name: messageData.name,
          phone: messageData.phone,
          status: "success",
        });

      } catch (error) {
        
        report.push({
          row: index + 1,
          name: row.Nome || "Sem nome",
          phone: row.Telefone,
          status: "failed",
          error: error.message,
        });
      }
    }

    return res.json({
      campaignId: campaign.id,
      totalRows: data.length,
      successCount: report.filter(r => r.status === "success").length,
      failedCount: report.filter(r => r.status === "failed").length,
      details: report,
    });

  } catch (err) {
    console.error("Erro ao processar campanha:", err);
    res.status(500).json({ error: "Erro ao processar a campanha" });
  }
});

module.exports = router;
