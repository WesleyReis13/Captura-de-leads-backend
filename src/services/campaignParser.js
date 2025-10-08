const xlsx = require("xlsx");

function parseCampaign(filePath) {
  
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const rows = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  
  const requiredFields = ["Nome", "Telefone", "Mensagem", "DataEnvio"];
  rows.forEach((row, index) => {
    requiredFields.forEach(field => {
      if (!row[field]) {
        throw new Error(`Linha ${index + 2} está faltando a coluna ${field}`);
      }
    });
  });

  
      const parsed = rows.map(row => {
      const cleanPhone = row["Telefone"].toString().replace(/\D/g, "");
      return {
        name: row["Nome"].trim(),
        phone: `${cleanPhone}@c.us`,
        message: row["Mensagem"].trim(),
        sendAt: new Date(row["DataEnvio"])
      };
    });


  return parsed;
}

module.exports = { parseCampaign };
