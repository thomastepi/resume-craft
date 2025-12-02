import axios from "axios";

export const getResumeAnalysis = async (data) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("jobDescription", data.jobDescription);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/resume/analyze-resume`,
      formData
    );
    return res.data;
  } catch (e) {
    console.log("Error getting resume", e);
    throw e.response?.data || e;
  }
};

export const getTailoredResume = async (data) => {
  const formData = new FormData();
  formData.append("file", data.file);
  formData.append("jobDescription", data.jobDescription);
  formData.append("prevAnalysis", data.prevAnalysis);
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/resume/tailored-resume`,
      formData
    );
    return res.data;
  } catch (e) {
    console.log("Error getting resume", e);
    throw e.response?.data || e;
  }
};
