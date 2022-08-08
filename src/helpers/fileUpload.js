//* helpers
import { getEnvironments } from "../helpers/getEnvironments";

const { VITE_CLOUDNAME } = getEnvironments();

export const fileUpload = async (file) => {
    if (!file) return null;

    const cloudUrl = `https://api.cloudinary.com/v1_1/${VITE_CLOUDNAME}/upload`;

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) throw new Error("File can't be uploaded");

        const cloudResponse = await response.json();

        return cloudResponse.secure_url;

    } catch (error) {
        alert("File can't be uploaded");
        return null;
    }
};