const express = require("express");
const multer = require("multer");
const xlsx = require("xlsx");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload-campaign", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado" });
    }

    
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    

    console.log("Dados da planilha:", data);

    

    return res.json({
      message: "Campanha importada com sucesso",
      totalContatos: data.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao processar a campanha" });
  }
});

module.exports = router;
