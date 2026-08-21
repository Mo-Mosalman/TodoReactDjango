import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TodoCard from "../components/TodoCard";
import { getTodos } from "../services/todos";


function TodoList() {

    const [todos, setTodos] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [page, setPage] = useState(1);

    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
    });


    async function loadTodos(pageNumber) {

        setLoading(true);
        setError("");

        try {

            const data = await getTodos(pageNumber);

            setTodos(data.results);

            setPagination({
                count: data.count,
                next: data.next,
                previous: data.previous,
            });

        } catch (error) {

            console.error(error);

            if (error.response?.data?.detail) {
                setError(
                    error.response.data.detail
                );
            } else {
                setError(
                    "Unable to load todos."
                );
            }

        } finally {

            setLoading(false);

        }
    }


    useEffect(() => {
        loadTodos(page);
    }, [page]);


    function handleNext() {

        if (pagination.next) {
            setPage((currentPage) => currentPage + 1);
        }

    }


    function handlePrevious() {

        if (pagination.previous) {
            setPage((currentPage) => currentPage - 1);
        }
    }

    function handleTodoDelete(todoId) {
    setTodos((currentTodos) =>
        currentTodos.filter(
            (todo) => todo.id !== todoId
        )
    );
}


    return (
        <div className="min-h-screen bg-gray-100">

            <div className="max-w-4xl mx-auto px-4 py-8">

                {/* Header */}

                <div className="flex items-center justify-between mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-gray-900">
                            My Todos
                        </h1>

                        <p className="mt-1 text-gray-500">
                            Manage your tasks
                        </p>

                    </div>


                    <Link
                        to="/todos/create"
                        className="rounded-lg bg-blue-600 px-4 py-2
                                    text-sm font-medium text-white
                                    hover:bg-blue-700"
                        >
                        Add Todo
                    </Link>

                </div>


                {/* Error */}

                {error && (

                    <div
                        role="alert"
                        className="mb-6 rounded-lg border border-red-200
                                   bg-red-50 px-4 py-3 text-red-700"
                    >
                        {error}
                    </div>

                )}


                {/* Loading */}

                {loading && (

                    <div className="py-12 text-center text-gray-500">
                        Loading todos...
                    </div>

                )}


                {/* Empty state */}

                {!loading && !error && todos.length === 0 && (

                    <div className="rounded-xl bg-white border
                                    border-gray-200 p-10 text-center">

                        <h2 className="text-lg font-semibold text-gray-900">
                            No todos yet
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Create your first todo to get started.
                        </p>

                    </div>

                )}


                {/* Todo list */}

                {!loading && todos.length > 0 && (

                    <div className="space-y-4">

                        {todos.map((todo) => (
                            <TodoCard
                                key={todo.id}
                                todo={todo}
                                onDelete={handleTodoDelete}
                            />
                        ))}

                    </div>

                )}


                {/* Pagination */}

                {!loading && todos.length > 0 && (

                    <div className="mt-8 flex items-center justify-between">

                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={!pagination.previous}
                            className="rounded-lg border border-gray-300
                                       bg-white px-4 py-2 text-sm
                                       font-medium text-gray-700
                                       hover:bg-gray-50
                                       disabled:cursor-not-allowed
                                       disabled:opacity-50"
                        >
                            ← Previous
                        </button>


                        <span className="text-sm text-gray-500">
                            Page {page}
                        </span>


                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={!pagination.next}
                            className="rounded-lg border border-gray-300
                                       bg-white px-4 py-2 text-sm
                                       font-medium text-gray-700
                                       hover:bg-gray-50
                                       disabled:cursor-not-allowed
                                       disabled:opacity-50"
                        >
                            Next →
                        </button>

                    </div>

                )}

            </div>

        </div>
    );
}


export default TodoList;