function ConfirmModal({
    isOpen,
    title = "Confirm deletion",
    message,
    onConfirm,
    onCancel,
    loading = false,
}) {

    if (!isOpen) {
        return null;
    }


    return (
        <div
            className="fixed inset-0 z-50 flex items-center
                       justify-center px-4"
        >

            {/* Backdrop */}

            <div
                className="absolute inset-0 bg-black/50"
                onClick={onCancel}
            />


            {/* Modal */}

            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
                className="relative w-full max-w-md
                           rounded-xl bg-white p-6
                           shadow-xl"
            >

                {/* Title */}

                <h2
                    id="modal-title"
                    className="text-xl font-semibold
                               text-gray-900"
                >
                    {title}
                </h2>


                {/* Message */}

                <p className="mt-3 text-sm text-gray-600">
                    {message}
                </p>


                {/* Actions */}

                <div className="mt-6 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className="rounded-lg border
                                   border-gray-300
                                   bg-white px-4 py-2
                                   text-sm font-medium
                                   text-gray-700
                                   hover:bg-gray-50
                                   disabled:cursor-not-allowed
                                   disabled:opacity-50"
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={loading}
                        className="rounded-lg bg-red-600
                                   px-4 py-2
                                   text-sm font-medium
                                   text-white
                                   hover:bg-red-700
                                   disabled:cursor-not-allowed
                                   disabled:bg-red-300"
                    >
                        {loading
                            ? "Deleting..."
                            : "Delete"
                        }
                    </button>

                </div>

            </div>

        </div>
    );
}


export default ConfirmModal;