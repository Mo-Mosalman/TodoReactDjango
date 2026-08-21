import {
    createContext,
    useContext,
    useState,
} from "react";

import {
    login as loginRequest,
    signup as signupRequest,
} from "../services/auth";


const AuthContext = createContext(null);


function AuthProvider({ children }) {

    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("access_token")
    );


    async function login(username, password) {
        const data = await loginRequest(
            username,
            password
        );

        localStorage.setItem(
            "access_token",
            data.access
        );

        localStorage.setItem(
            "refresh_token",
            data.refresh
        );

        setAccessToken(data.access);

        return data;
    }


    async function signup(username, password) {
        return await signupRequest(
            username,
            password
        );
    }


    function logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        setAccessToken(null);
    }


    const isAuthenticated = Boolean(accessToken);


    const value = {
        accessToken,
        isAuthenticated,
        login,
        signup,
        logout,
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}


export {
    AuthProvider,
    useAuth,
};