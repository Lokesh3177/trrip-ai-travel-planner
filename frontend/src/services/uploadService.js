import api from "../api/axios";

export const uploadDocuments = async (
  formData
) => {
  const { data } = await api.post(
    "/upload",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};