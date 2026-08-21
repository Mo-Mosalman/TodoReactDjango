import { useEffect, useState } from "react";
import {
    Link,
    Navigate,
    useLocation,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Login() {
    const {
        login,
        isAuthenticated,
    } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    /*
     * If the user is already authenticated,
     * there is no reason to show the login page.
     */
    if (isAuthenticated) {
        return (
            <Navigate
                to="/todos"
                replace
            />
        );
    }


    async function handleSubmit(event) {
        event.preventDefault();

        setError("");

        // Client-side validation
        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }

        setLoading(true);

        try {
            await login(
                username.trim(),
                password
            );

            /*
             * ProtectedRoute stores the original
             * requested location in location.state.from.
             */
            const from =
                location.state?.from?.pathname ||
                "/todos";

            navigate(from, {
                replace: true,
            });

        } catch (error) {
            setError(
                getErrorMessage(error)
            );
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md">

                <div className="bg-white rounded-2xl shadow-lg p-8">

                    {/* Header */}

                    <div className="text-center mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Login to manage your todos
                        </p>

                    </div>


                    {/* Error */}

                    {error && (
                        <div
                            role="alert"
                            className="mb-5 rounded-lg bg-red-50 border border-red-200
                                       px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}


                    {/* Form */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Username */}

                        <div>

                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Username
                            </label>

                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                value={username}
                                onChange={(event) => {
                                    setUsername(
                                        event.target.value
                                    );

                                    setError("");
                                }}
                                disabled={loading}
                                placeholder="Enter your username"
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 text-gray-900
                                           placeholder-gray-400
                                           focus:border-blue-500
                                           focus:outline-none
                                           focus:ring-2 focus:ring-blue-200
                                           disabled:bg-gray-100"
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(
                                        event.target.value
                                    );

                                    setError("");
                                }}
                                disabled={loading}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 text-gray-900
                                           placeholder-gray-400
                                           focus:border-blue-500
                                           focus:outline-none
                                           focus:ring-2 focus:ring-blue-200
                                           disabled:bg-gray-100"
                            />

                        </div>


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600
                                       px-4 py-3 font-medium text-white
                                       transition
                                       hover:bg-blue-700
                                       focus:outline-none
                                       focus:ring-2 focus:ring-blue-300
                                       disabled:cursor-not-allowed
                                       disabled:bg-blue-300"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"
                            }
                        </button>

                    </form>


                    {/* Signup */}

                    <div className="mt-6 text-center text-sm text-gray-600">

                        <span>
                            Don't have an account?{" "}
                        </span>

                        <Link
                            to="/signup"
                            className="font-medium text-blue-600
                                       hover:text-blue-700"
                        >
                            Create an account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}


function getErrorMessage(error) {

    /*
     * Axios error with a response from Django.
     */
    if (error.response?.data) {

        const data = error.response.data;


        // Simple JWT usually returns:
        // { detail: "No active account..." }

        if (data.detail) {
            return data.detail;
        }


        // Handle DRF field errors:
        //
        // {
        //     username: ["This field is required."]
        // }

        const firstFieldError =
            Object.values(data).find(
                (value) =>
                    Array.isArray(value) &&
                    value.length > 0
            );

        if (firstFieldError) {
            return firstFieldError[0];
        }
    }


    /*
     * Network/server error.
     */
    if (error.request && !error.response) {
        return "Unable to connect to the server.";
    }


    /*
     * Fallback.
     */
    return (
        error.message ||
        "Unable to login. Please try again."
    );
}


export default Login;