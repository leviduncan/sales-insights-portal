interface DeleteConfirmModalProps {
  onConfirm: () => Promise<void>;
  onClose: () => void;
}

export default function DeleteConfirmModal({
  onConfirm,
  onClose,
}: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-full shadow-xl w-full max-w-sm p-6">
        <h3 className="text-lg font-bold text-red-500 mb-2">Delete Record</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
          Are you sure you want to delete this record? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm rounded bg-red-500 hover:bg-red-600 text-white font-semibold transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
