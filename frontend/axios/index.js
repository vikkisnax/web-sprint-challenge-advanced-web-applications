// ✨ implement axiosWithAuth
// empty page - i took this from an example... i don't understand

import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    // Set the Authorization header with the token for authenticated requests
    return axios.create({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});
};

export default axiosWithAuth;