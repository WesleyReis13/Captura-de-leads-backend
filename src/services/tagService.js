
function generateTagsFromLead(leadData) {
  const { objective, routine } = leadData;
  const tags = [];

  
  if (objective.includes('Emagrecer')) tags.push('lead-emagrecimento');
  if (objective.includes('massa')) tags.push('lead-ganho-massa');
  if (objective.includes('desempenho')) tags.push('lead-desempenho');
  if (objective.includes('hábitos')) tags.push('lead-habitos');

  
  if (routine.includes('Não pratico')) tags.push('lead-iniciante');
  if (routine.includes('ocasionalmente')) tags.push('lead-intermediario');
  if (routine.includes('regularmente')) tags.push('lead-avancado');

  return tags;
}

module.exports = { generateTagsFromLead };