import { useState } from "react";
import {
    Link,
    Navigate,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


function Signup() {
    const {
        signup,
        isAuthenticated,
    } = useAuth();

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");


    // Already logged in
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
        setSuccess("");


        // -----------------------------
        // Client-side validation
        // -----------------------------

        if (!username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!password) {
            setError("Password is required.");
            return;
        }

        if (!email){
            setError('Email is required.');
            return;
        }

        if (password.length < 8) {
            setError(
                "Password must be at least 8 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }


        setLoading(true);


        try {
            await signup(
                username.trim(),
                password,
                email
            );

            setSuccess(
                "Account created successfully. Redirecting to login..."
            );

            /*
             * Give the user a moment to see the
             * success message.
             */
            setTimeout(() => {
                navigate("/login", {
                    replace: true,
                });
            }, 2000);

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
                            Create Account
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Create an account to start managing your todos
                        </p>

                    </div>


                    {/* Error */}

                    {error && (
                        <div
                            role="alert"
                            className="mb-5 rounded-lg bg-red-50
                                       border border-red-200
                                       px-4 py-3 text-sm text-red-700"
                        >
                            {error}
                        </div>
                    )}


                    {/* Success */}

                    {success && (
                        <div
                            role="status"
                            className="mb-5 rounded-lg bg-green-50
                                       border border-green-200
                                       px-4 py-3 text-sm text-green-700"
                        >
                            {success}
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
                                className="block mb-1 text-sm font-medium text-gray-700"
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
                                placeholder="Choose a username"
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 text-gray-900
                                           placeholder-gray-400
                                           focus:border-blue-500
                                           focus:outline-none
                                           focus:ring-2 focus:ring-blue-200
                                           disabled:bg-gray-100"
                            />

                        </div>

                        {/* Email */}

                        <div>

                            <label
                                htmlFor="email"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type='email'
                                autoComplete="email"
                                value={email}
                                onChange={(event) => {
                                    setEmail(
                                        event.target.value
                                    );

                                    setError("");
                                }}
                                disabled={loading}
                                placeholder="Enter your email"
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
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(event) => {
                                    setPassword(
                                        event.target.value
                                    );

                                    setError("");
                                }}
                                disabled={loading}
                                placeholder="Create a password"
                                className="w-full rounded-lg border border-gray-300
                                           px-4 py-3 text-gray-900
                                           placeholder-gray-400
                                           focus:border-blue-500
                                           focus:outline-none
                                           focus:ring-2 focus:ring-blue-200
                                           disabled:bg-gray-100"
                            />

                            <p className="mt-2 text-xs text-gray-500">
                                Password must be at least 8 characters.
                            </p>

                        </div>


                        {/* Confirm password */}

                        <div>

                            <label
                                htmlFor="confirmPassword"
                                className="block mb-1 text-sm font-medium text-gray-700"
                            >
                                Confirm Password
                            </label>

                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(event) => {
                                    setConfirmPassword(
                                        event.target.value
                                    );

                                    setError("");
                                }}
                                disabled={loading}
                                placeholder="Confirm your password"
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
                                ? "Creating account..."
                                : "Create Account"
                            }
                        </button>

                    </form>


                    {/* Login link */}

                    <div className="mt-6 text-center text-sm text-gray-600">

                        <span>
                            Already have an account?{" "}
                        </span>

                        <Link
                            to="/login"
                            className="font-medium text-blue-600
                                       hover:text-blue-700"
                        >
                            Login
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}


/*
 * Convert Django/DRF/Axios errors into
 * something useful for the user.
 */
function getErrorMessage(error) {

    if (error.response?.data) {

        const data = error.response.data;

        const firstFieldError =
            Object.values(data).find(
                (value) =>
                    Array.isArray(value) &&
                    value.length > 0
            );

        if (firstFieldError) {
            return firstFieldError[0];
        }

        if (data.detail) {
            return data.detail;
        }
    }


    // Server unreachable

    if (error.request && !error.response) {
        return "Unable to connect to the server.";
    }


    return (
        error.message ||
        "Unable to create account. Please try again."
    );
}


export default Signup;