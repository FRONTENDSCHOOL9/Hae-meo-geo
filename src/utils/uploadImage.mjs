import axios from "axios";

async function uploadImage(formData) {
  const imgFormData = new FormData();
  imgFormData.set("attach", formData.image[0]);

  const fileRes = await axios.post(
    `${import.meta.env.VITE_API_SERVER}/files`,
    imgFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        "client-id": import.meta.env.VITE_CLIENT_ID,
      },
    },
  );

  return fileRes.data?.item[0].name;
}

export default uploadImage;
