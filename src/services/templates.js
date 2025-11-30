import axios from "axios";

export const getTemplates = async (accessToken) => {
  await axios
    .get(`${process.env.REACT_APP_BASE_URL}/api/templates/get`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((res) => {
      localStorage.setItem("templates", JSON.stringify(res.data));
    })
    .catch((e) => {
      console.log("Error getting templates", e);
      throw e.response?.data || e;
    });
};

export const createTemplate = async ({
  generatedHTML,
  templateName,
  accessToken,
}) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/templates/create`,
      JSON.stringify({ generatedHTML, templateName }),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (e) {
    console.log("Error creating template", e);
    throw e.response?.data || e;
  }
};

export const deleteTemplate = async (id, accessToken) => {
  try {
    const res = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/api/templates/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log("Error deleting template", e);
    throw e.response?.data || e;
  }
};
