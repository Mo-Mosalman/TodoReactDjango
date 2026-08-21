import { useState } from "react";
import { Link } from "react-router-dom";

import { deleteTodo } from "../services/todos";
import ConfirmModal from "./ConfirmModal";


function TodoCard({ todo, onDelete }) {

    const [isModalOpen, setIsModalOpen] =
        useState(false);

    const [deleting, setDeleting] =
        useState(false);

    const [error, setError] =
        useState("");


    function openDeleteModal() {
        setError("");
        setIsModalOpen(true);
    }


    function closeDeleteModal() {

        if (deleting) {
            return;
        }

        setIsModalOpen(false);
    }


    async function handleDelete() {

        setDeleting(true);
        setError("");


        try {

            await deleteTodo(todo.id);

            /*
             * Tell TodoList that the Todo
             * was successfully deleted.
             */
            onDelete(todo.id);

            setIsModalOpen(false);

        } catch (error) {

            console.error(error);

            if (error.response?.data?.detail) {
                setError(
                    error.response.data.detail
                );
            } else {
                setError(
                    "Unable to delete this Todo."
                );
            }

        } finally {

            setDeleting(false);

        }
    }


    return (
        <>
            <div
                className="bg-white rounded-xl shadow-sm
                           border border-gray-200 p-5"
            >

                <div
                    className="flex items-start
                               justify-between gap-4"
                >

                    <div className="min-w-0">

                        <h2
                            className={`text-lg font-semibold truncate ${
                                todo.completed
                                    ? "text-gray-400 line-through"
                                    : "text-gray-900"
                            }`}
                        >
                            {todo.title}
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            {todo.completed
                                ? "Completed"
                                : "Not completed"
                            }
                        </p>

                    </div>


                    <span
                        className={`shrink-0 px-3 py-1
                                    rounded-full text-xs
                                    font-medium ${
                            todo.completed
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                        {todo.completed
                            ? "Completed"
                            : "Pending"
                        }
                    </span>

                </div>


                {/* Error */}

                {error && (
                    <p className="mt-3 text-sm text-red-600">
                        {error}
                    </p>
                )}


                {/* Actions */}

                <div
                    className="mt-4 flex items-center gap-4"
                >

                    <Link
                        to={`/todos/${todo.id}`}
                        className="text-sm font-medium
                                   text-blue-600
                                   hover:text-blue-700"
                    >
                        View details →
                    </Link>


                    <button
                        type="button"
                        onClick={openDeleteModal}
                        disabled={deleting}
                        className="text-sm font-medium
                                   text-red-600
                                   hover:text-red-700
                                   disabled:cursor-not-allowed
                                   disabled:opacity-50"
                    >
                        Delete
                    </button>

                </div>

            </div>


            {/* Delete Modal */}

            <ConfirmModal
                isOpen={isModalOpen}
                title="Delete Todo"
                message={`Are you sure you want to delete "${todo.title}"? This action cannot be undone.`}
                onConfirm={handleDelete}
                onCancel={closeDeleteModal}
                loading={deleting}
            />

        </>
    );
}


export default TodoCard;