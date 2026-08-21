import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    createTodo,
    getTodo,
    updateTodo,
} from "../services/todos";


function TodoForm() {

    const { id } = useParams();

    const navigate = useNavigate();

    const isEditMode = Boolean(id);


    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [notifyAt, setNotifyAt] = useState("");

    const [loading, setLoading] = useState(
        isEditMode
    );

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    /*
     * Load Todo when editing.
     */
    useEffect(() => {

        if (!isEditMode) {
            return;
        }


        async function loadTodo() {

            try {

                const todo = await getTodo(id);

                setTitle(todo.title || "");
                setDescription(
                    todo.description || ""
                );
                setCompleted(
                    todo.completed || false
                );

                /*
                 * HTML datetime-local expects:
                 * YYYY-MM-DDTHH:mm
                 */
                if (todo.notify_at) {
                    setNotifyAt(
                        formatDateTimeLocal(
                            todo.notify_at
                        )
                    );
                }

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

    }, [id, isEditMode]);


    async function handleSubmit(event) {

        event.preventDefault();

        setError("");


        if (!title.trim()) {
            setError("Title is required.");
            return;
        }


        setSaving(true);


        const todoData = {
            title: title.trim(),
            description: description.trim(),
            completed,
            notify_at: notifyAt
                ? new Date(notifyAt).toISOString()
                : null,
        };


        try {

            let todo;


            if (isEditMode) {

                todo = await updateTodo(
                    id,
                    todoData
                );

            } else {

                todo = await createTodo(
                    todoData
                );

            }


            /*
             * After successful save, go to
             * the Todo detail page.
             */
            navigate(`/todos/${todo.id}`);

        } catch (error) {

            console.error(error);

            setError(
                getErrorMessage(error)
            );

        } finally {

            setSaving(false);

        }
    }


    if (loading) {

        return (
            <div className="min-h-screen bg-gray-100
                            flex items-center justify-center">

                <p className="text-gray-500">
                    Loading Todo...
                </p>

            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-2xl mx-auto px-4 py-8">

                <div className="bg-white rounded-2xl
                                shadow-sm border border-gray-200
                                p-8">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="text-3xl font-bold text-gray-900">

                            {isEditMode
                                ? "Edit Todo"
                                : "Create Todo"
                            }

                        </h1>

                        <p className="mt-2 text-gray-500">

                            {isEditMode
                                ? "Update your Todo."
                                : "Create a new Todo."
                            }

                        </p>

                    </div>


                    {/* Error */}

                    {error && (

                        <div
                            role="alert"
                            className="mb-6 rounded-lg
                                       border border-red-200
                                       bg-red-50
                                       px-4 py-3
                                       text-sm text-red-700"
                        >
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* Title */}

                        <div>

                            <label
                                htmlFor="title"
                                className="block mb-2
                                           text-sm font-medium
                                           text-gray-700"
                            >
                                Title
                            </label>

                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(event) =>
                                    setTitle(
                                        event.target.value
                                    )
                                }
                                disabled={saving}
                                placeholder="Enter Todo title"
                                maxLength={200}
                                className="w-full rounded-lg
                                           border border-gray-300
                                           px-4 py-3
                                           focus:border-blue-500
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-blue-200
                                           disabled:bg-gray-100"
                            />

                        </div>


                        {/* Description */}

                        <div>

                            <label
                                htmlFor="description"
                                className="block mb-2
                                           text-sm font-medium
                                           text-gray-700"
                            >
                                Description
                            </label>

                            <textarea
                                id="description"
                                value={description}
                                onChange={(event) =>
                                    setDescription(
                                        event.target.value
                                    )
                                }
                                disabled={saving}
                                rows={5}
                                placeholder="Describe your Todo..."
                                className="w-full rounded-lg
                                           border border-gray-300
                                           px-4 py-3
                                           resize-none
                                           focus:border-blue-500
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-blue-200
                                           disabled:bg-gray-100"
                            />

                        </div>


                        {/* Notification */}

                        <div>

                            <label
                                htmlFor="notifyAt"
                                className="block mb-2
                                           text-sm font-medium
                                           text-gray-700"
                            >
                                Notification time
                            </label>

                            <input
                                id="notifyAt"
                                type="datetime-local"
                                value={notifyAt}
                                onChange={(event) =>
                                    setNotifyAt(
                                        event.target.value
                                    )
                                }
                                disabled={saving}
                                className="w-full rounded-lg
                                           border border-gray-300
                                           px-4 py-3
                                           focus:border-blue-500
                                           focus:outline-none
                                           focus:ring-2
                                           focus:ring-blue-200
                                           disabled:bg-gray-100"
                            />

                        </div>


                        {/* Completed */}

                        {isEditMode && (

                            <div className="flex items-center gap-3">

                                <input
                                    id="completed"
                                    type="checkbox"
                                    checked={completed}
                                    onChange={(event) =>
                                        setCompleted(
                                            event.target.checked
                                        )
                                    }
                                    disabled={saving}
                                    className="h-4 w-4
                                               rounded
                                               border-gray-300
                                               text-blue-600
                                               focus:ring-blue-500"
                                />

                                <label
                                    htmlFor="completed"
                                    className="text-sm
                                               font-medium
                                               text-gray-700"
                                >
                                    Mark as completed
                                </label>

                            </div>

                        )}


                        {/* Buttons */}

                        <div className="flex items-center
                                        justify-end gap-3">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(-1)
                                }
                                disabled={saving}
                                className="rounded-lg
                                           border border-gray-300
                                           bg-white px-5 py-2.5
                                           text-sm font-medium
                                           text-gray-700
                                           hover:bg-gray-50
                                           disabled:opacity-50"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                                className="rounded-lg
                                           bg-blue-600 px-5 py-2.5
                                           text-sm font-medium
                                           text-white
                                           hover:bg-blue-700
                                           disabled:cursor-not-allowed
                                           disabled:bg-blue-300"
                            >
                                {saving
                                    ? "Saving..."
                                    : isEditMode
                                        ? "Save Changes"
                                        : "Create Todo"
                                }
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}


function formatDateTimeLocal(value) {

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const hours = String(
        date.getHours()
    ).padStart(2, "0");

    const minutes = String(
        date.getMinutes()
    ).padStart(2, "0");


    return `${year}-${month}-${day}T${hours}:${minutes}`;
}


function getErrorMessage(error) {

    if (error.response?.data) {

        const data = error.response.data;


        if (data.detail) {
            return data.detail;
        }


        const firstError =
            Object.values(data).find(
                (value) =>
                    Array.isArray(value) &&
                    value.length > 0
            );


        if (firstError) {
            return firstError[0];
        }
    }


    if (error.request && !error.response) {
        return "Unable to connect to the server.";
    }


    return (
        error.message ||
        "Something went wrong."
    );
}


export default TodoForm;