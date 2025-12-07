import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const getAllJobs = async (accessToken) => {
  try {
    const res = await axios.get(`${baseUrl}/api/job/get-all-jobs`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("Error getting job", e);
    throw e.response?.data || e;
  }
};

const getJobById = async (id, accessToken) => {
  try {
    const res = await axios.get(`${baseUrl}/api/job/get-job/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("Error getting job", e);
    throw e.response?.data || e;
  }
};

const createJob = async (data, accessToken) => {
  try {
    const res = await axios.post(`${baseUrl}/api/job/add-job`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("Error creating job", e);
    throw e.response?.data || e;
  }
};

const updateJob = async (id, data, accessToken) => {
  try {
    const res = await axios.put(`${baseUrl}/api/job/update-job/${id}`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("Error updating job", e);
    throw e.response?.data || e;
  }
};

const deleteJob = async (id, accessToken) => {
  try {
    const res = await axios.delete(`${baseUrl}/api/job/delete-job/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.data;
  } catch (e) {
    console.log("Error deleting job", e);
    throw e.response?.data || e;
  }
};

export { getAllJobs, getJobById, createJob, updateJob, deleteJob };
