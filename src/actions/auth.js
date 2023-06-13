import axiosInstance, {protectedAxios} from "../utils/axiosAPI";
import axios from "axios";

export const setAuthToken = token => {
    if (token) {
        axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers["Authorization"];
    }
}

export const getUser = (setFunc) => {
    return protectedAxios(axiosInstance.get, "/user/profile")
        .then(response => {
            return response.data;
        })
        .catch(err => console.log(err));
};


export const loginSubmit = async (values) => {
    let loginPayload = new FormData();
    loginPayload.set('username', values?.username)
    loginPayload.set('password', values?.password)


    return axios.post("/api/login", loginPayload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'accept': 'application/json'
        }
    })
        .then(response => {
            console.log(response.data)
            localStorage.setItem("access_token", response.data.access_token);
            localStorage.setItem("expires", response.data.expires);
            localStorage.setItem("refresh_token", response.data.refresh_token);

            setAuthToken(response.data.access_token);

            window.location.href = '/';
        })
        .catch((err) => {
            console.log(err);
        });
};


export const logoutSubmit = () => {
    const logoutPayload = {
        refresh_token: localStorage.getItem('refresh_token'),
    }

    protectedAxios(axiosInstance.post, "/logout/", logoutPayload)
        .then(response => {
            localStorage.clear();
            setAuthToken();

            window.location.href = '/';
        })
        .catch(err => console.log(err));
};
