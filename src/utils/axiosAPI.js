import axios from 'axios';

export const fullExit = () => {
    localStorage.clear();
    window.location.href = '/login/';
}

const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access_token') ? `Bearer ${localStorage.getItem('access_token')}` : null,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.response.use(r => r, (r) => {
    console.log(r)
})


const axiosRefreshToken = async (token) => {
    return await axiosInstance.post('/refresh-token', {
        refresh_token: token
    })
        .then((response) => {
            if (response.status === 200) {
                localStorage.setItem("access_token", response.data.access_token);
                localStorage.setItem("expires", response.data.expires);
                axiosInstance.defaults.headers['Authorization'] = "Bearer " + response.data.access_token;
                return Promise.resolve();
            }
            return Promise.reject();
        }).catch((e) => {
            if (e.response.status === 401) {
                fullExit();
                return Promise.resolve();
            }
            return Promise.reject();

        });
}

export const protectedAxios = async (method, url, options, head) => {
    let refresh_token = null;
    let access_token = null;
    let expires = null;

    if (localStorage.getItem('access_token')) {
        access_token = localStorage.getItem('access_token');
        refresh_token = localStorage.getItem('refresh_token');
        expires = localStorage.getItem('expires');
    } else {
        fullExit();
    }
    if (refresh_token && access_token && expires) {
        const now = Math.ceil(Date.now() / 1000);
        expires = Math.ceil(new Date(expires) / 1000);
        if (expires <= now) {
            await axiosRefreshToken(refresh_token);
        }
    } else {
        fullExit();
    }
    return await method(url, options, head);
}

export default axiosInstance;
