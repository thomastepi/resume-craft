const checkMandatoryFields = (user) => {
  const missingFields = [];
  if (!user.firstName || !user.lastName) missingFields.push("Full Name");
  if (!user.email) missingFields.push("Email");
  if (!user.mobileNumber) missingFields.push("Phone Number");
  if (!user.summary) missingFields.push("Summary");
  if (!user.skills || user.skills.length === 0) missingFields.push("Skills");
  if (!user.education || user.education.length === 0)
    missingFields.push("Education");

  return missingFields;
};

export default checkMandatoryFields;
