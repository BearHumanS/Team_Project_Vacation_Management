import axios from 'axios';

const cloudinaryName = import.meta.env.VITE_CLOUD_NAME;
const formData = new FormData();

export const handleUpload = async (file: string | Blob) => {
  formData.append('file', file);
  formData.append('upload_preset', 'dvmzwc5k');

  if (!file) {
    return null;
  }

  const response = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload/`,
    formData,
  );

  return response;
};

export const handleS3Upload = async (file: string | Blob) => {
  if (!file) return;

  formData.append('file', file);

  try {
    const res = await axios.post(
      `https://nextjs-s3-upload-test.vercel.app/api/s3-upload`,
      formData,
    );

    return res;
  } catch (error) {
    console.log({ error: `${error}` });
  }
};
