import { Pencil, Trash2 } from 'lucide-react';

export default function NoteCard({ note, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-2">
          {note.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:text-blue-700 transition-colors"
            title="Edit note"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 hover:text-red-700 transition-colors"
            title="Delete note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mb-3 whitespace-pre-wrap line-clamp-3">
        {note.content}
      </p>

      <div className="text-xs text-gray-400">
        {formatDate(note.createdAt)}
      </div>
    </div>
  );
}
