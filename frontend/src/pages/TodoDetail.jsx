import { useEffect, useState } from "react";
import {
    Link,
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    deleteTodo,
    getTodo,
} from "../services/todos";

import ConfirmModal from "../components/ConfirmModal";


function TodoDetail() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [todo, setTodo] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [isDeleteModalOpen, setIsDeleteModalOpen] =
        useState(false);

    const [deleting, setDeleting] = useState(false);


    useEffect(() => {

        async function loadTodo() {

            setLoading(true);
            setError("");

            try {

                const data = await getTodo(id);

                setTodo(data);

            } catch (error) {

                console.error(error);

                setError(
                    getErrorMessage(error)
                );

            } finally {

                setLoading(false);

            }
        }


        loadTodo();

    }, [id]);


    function openDeleteModal() {

        setIsDeleteModalOpen(true);
    }


    function closeDeleteModal() {

        if (deleting) {
            return;
        }

        setIsDeleteModalOpen(false);
    }


    async function handleDelete() {

        setDeleting(true);
        setError("");

        try {

            await deleteTodo(id);

            /*
             * Todo no longer exists, so return
             * to the Todo list.
             */
            navigate("/todos", {
                replace: true,
            });

        } catch (error) {

            console.error(error);

            setError(
                getErrorMessage(error)
            );

            setDeleting(false);

        }
    }


    if (loading) {

        return (
            <div
                className="min-h-screen bg-gray-100
                           flex items-center justify-center"
            >
                <p className="text-gray-500">
                    Loading Todo...
                </p>
            </div>
        );
    }


    if (error && !todo) {

        return (
            <div className="min-h-screen bg-gray-100">

                <div className="max-w-3xl mx-auto px-4 py-8">

                    <div
                        className="rounded-xl border
                                   border-red-200 bg-red-50
                                   p-6"
                    >

                        <h1
                            className="text-lg font-semibold
                                       text-red-800"
                        >
                            Unable to load Todo
                        </h1>

                        <p className="mt-2 text-sm text-red-700">
                            {error}
                        </p>

                        <Link
                            to="/todos"
                            className="inline-block mt-4
                                       text-sm font-medium
                                       text-blue-600
                                       hover:text-blue-700"
                        >
                            ← Back to Todos
                        </Link>

                    </div>

                </div>

            </div>
        );
    }


    if (!todo) {
        return null;
    }


    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-3xl mx-auto px-4 py-8">

                {/* Back */}

                <Link
                    to="/todos"
                    className="inline-flex items-center
                               text-sm font-medium
                               text-gray-600
                               hover:text-gray-900"
                >
                    ← Back to Todos
                </Link>


                {/* Main card */}

                <div
                    className="mt-6 bg-white rounded-2xl
                               border border-gray-200
                               shadow-sm"
                >

                    {/* Header */}

                    <div className="p-6 border-b border-gray-200">

                        <div
                            className="flex flex-col gap-4
                                       sm:flex-row
                                       sm:items-start
                                       sm:justify-between"
                        >

                            <div>

                                <h1
                                    className={`text-3xl font-bold ${
                                        todo.completed
                                            ? "text-gray-400 line-through"
                                            : "text-gray-900"
                                    }`}
                                >
                                    {todo.title}
                                </h1>

                                <div className="mt-3">

                                    <StatusBadge
                                        completed={
                                            todo.completed
                                        }
                                    />

                                </div>

                            </div>


                            {/* Actions */}

                            <div className="flex gap-3">

                                <Link
                                    to={`/todos/${todo.id}/edit`}
                                    className="rounded-lg
                                               bg-blue-600
                                               px-4 py-2
                                               text-sm font-medium
                                               text-white
                                               hover:bg-blue-700"
                                >
                                    Edit
                                </Link>


                                <button
                                    type="button"
                                    onClick={
                                        openDeleteModal
                                    }
                                    disabled={deleting}
                                    className="rounded-lg
                                               bg-red-600
                                               px-4 py-2
                                               text-sm font-medium
                                               text-white
                                               hover:bg-red-700
                                               disabled:opacity-50"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>


                    {/* Error */}

                    {error && (

                        <div
                            className="mx-6 mt-6 rounded-lg
                                       border border-red-200
                                       bg-red-50 px-4 py-3
                                       text-sm text-red-700"
                        >
                            {error}
                        </div>

                    )}


                    {/* Description */}

                    <div className="p-6">

                        <h2
                            className="text-sm font-semibold
                                       uppercase tracking-wide
                                       text-gray-500"
                        >
                            Description
                        </h2>

                        <div className="mt-3">

                            {todo.description ? (

                                <p className="whitespace-pre-wrap
                                              text-gray-700
                                              leading-relaxed">
                                    {todo.description}
                                </p>

                            ) : (

                                <p className="text-gray-400 italic">
                                    No description provided.
                                </p>

                            )}

                        </div>

                    </div>


                    {/* Metadata */}

                    <div
                        className="border-t border-gray-200
                                   bg-gray-50 rounded-b-2xl
                                   p-6"
                    >

                        <div
                            className="grid grid-cols-1
                                       sm:grid-cols-3 gap-6"
                        >

                            <InfoItem
                                label="Created"
                                value={
                                    formatDate(
                                        todo.created_at
                                    )
                                }
                            />


                            <InfoItem
                                label="Last updated"
                                value={
                                    formatDate(
                                        todo.updated_at
                                    )
                                }
                            />


                            <InfoItem
                                label="Notification"
                                value={
                                    todo.notify_at
                                        ? formatDate(
                                            todo.notify_at
                                        )
                                        : "Not scheduled"
                                }
                            />

                        </div>

                    </div>

                </div>

            </div>


            {/* Delete confirmation */}

            <ConfirmModal
                isOpen={isDeleteModalOpen}
                title="Delete Todo"
                message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={closeDeleteModal}
                loading={deleting}
            />

        </div>
    );
}


/*
 * Todo completion status.
 */
function StatusBadge({ completed }) {

    return (
        <span
            className={`inline-flex items-center
                        rounded-full px-3 py-1
                        text-sm font-medium ${
                completed
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
            }`}
        >
            {completed
                ? "Completed"
                : "Pending"
            }
        </span>
    );
}


/*
 * Metadata item.
 */
function InfoItem({ label, value }) {

    return (
        <div>

            <p
                className="text-xs font-semibold
                           uppercase tracking-wide
                           text-gray-500"
            >
                {label}
            </p>

            <p className="mt-1 text-sm text-gray-700">
                {value}
            </p>

        </div>
    );
}


/*
 * Format Django's ISO datetime.
 */
function formatDate(value) {

    if (!value) {
        return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "—";
    }

    return date.toLocaleString(
        undefined,
        {
            dateStyle: "medium",
            timeStyle: "short",
        }
    );
}


/*
 * Convert API errors into something
 * readable by the user.
 */
function getErrorMessage(error) {

    if (error.response?.data) {

        const data = error.response.data;


        if (data.detail) {
            return data.detail;
        }


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


    if (error.request && !error.response) {
        return "Unable to connect to the server.";
    }


    return (
        error.message ||
        "Unable to load Todo."
    );
}


export default TodoDetail;