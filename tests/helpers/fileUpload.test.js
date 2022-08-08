//* libraries
import { v2 as cloudinary } from 'cloudinary';
//* helpers
import { fileUpload, getEnvironments } from "../../src/helpers";

const {
    VITE_CLOUDNAME,
    VITE_CLOUDAPIKEY,
    VITE_CLOUDAPISECRET,
} = getEnvironments();

cloudinary.config({
    cloud_name: `${VITE_CLOUDNAME}`,
    api_key: `${VITE_CLOUDAPIKEY}`,
    api_secret: `${VITE_CLOUDAPISECRET}`,
    secure: true
});

jest.spyOn(window, 'alert').mockImplementation(() => { });

describe('Tests in fileUpload', () => {
    test('should load file to cloudinary', async () => {
        const imageUrl = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80';

        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        await cloudinary.api.delete_resources(['journal/' + imageId], { resource_type: 'image' });
    });

    test('should return null', async () => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
        expect(window.alert).toBeCalledWith("File can't be uploaded");
    });
});