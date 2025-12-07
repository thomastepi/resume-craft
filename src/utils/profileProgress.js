export const calculateProfileProgress = (user) => {
  if (!user) return 0;

  const fields = [
    { name: "summary", weight: 20 },
    { name: "experience", weight: 30 },
    { name: "education", weight: 20 },
    { name: "skills", weight: 20 },
    { name: "projects", weight: 10 },
  ];

  let score = 0;
  let totalWeight = 0;

  fields.forEach(field => {
    const value = user[field.name];
    totalWeight += field.weight;
    if (value && (!Array.isArray(value) || value.length > 0)) {
      score += field.weight;
    }
  });

  if (totalWeight === 0) return 0;

  return Math.round((score / totalWeight) * 100);
};