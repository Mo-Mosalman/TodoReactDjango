import api from "./api";


async function login(username, password) {
    const response = await api.post("/auth/login/", {
        username,
        password,
    });

    return response.data;
}


async function signup(username, password,email) {
    const response = await api.post("/auth/signup/", {
        username,
        password,
        email
    });

    return response.data;
}


export {
    login,
    signup,
};