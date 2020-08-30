import axios from 'axios';

export const client = axios.create({
    baseURL: 'http://localhost:3007',
    headers: {
        'x-platform': 'web',
        'Content-Type': 'application/json',
    },
});

export const autorizedClient = axios.create({
    baseURL: 'http://localhost:3007',
    headers: {
      'x-platform': 'web',
      'Content-Type': 'application/json',
      'ETag': "32a-jNeCstfTSOn7ym+/QPN3Coht2H8",
  },
});

// export const setAutorizedClientHeaders = (sessionToken, ip, deviceId) => {
//     autorizedClient.defaults.headers.common[‘x-session’] = sessionToken;
//     autorizedClient.defaults.headers.common[‘x-ip’] = ip;
//     autorizedClient.defaults.headers.common[‘x-device-id’] = deviceId;
// };