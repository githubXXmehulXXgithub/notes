import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { api } from './lib/supabase';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const data = await api.getNotes();
      setNotes(data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
    setLoading(false);
  };

  const handleSaveNote = async (noteData) => {
    try {
      if (editingNote) {
        await api.updateNote(editingNote._id, noteData.title, noteData.content);
      } else {
        await api.createNote(noteData.title, noteData.content);
      }
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }

    setShowForm(false);
    setEditingNote(null);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDeleteNote = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await api.deleteNote(id);
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleNewNote = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">My Notes</h1>
          <button
            onClick={handleNewNote}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <Plus size={20} />
            New Note
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}

        {showForm && (
          <NoteForm
            note={editingNote}
            onSave={handleSaveNote}
            onCancel={handleCloseForm}
          />
        )}
      </div>
    </div>
  );
}

export default App;
