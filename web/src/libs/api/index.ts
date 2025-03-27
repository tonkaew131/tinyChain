import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import type { paths } from './api';

const fetchClient = createFetchClient<paths>({
    baseUrl: 'http://localhost:65535/api/',
});
export const $api = createClient(fetchClient);
