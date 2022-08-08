//* Used for FetchAPI testing
import 'whatwg-fetch';

//* used for cloudinary testing
import 'setimmediate';

//* active .env.test variables for testing
require('dotenv').config({
    path: '.env.test'
});

jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({ ...process.env })
}));