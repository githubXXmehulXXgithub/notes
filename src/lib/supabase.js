const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const api = {
  async getNotes() {
    const response = await fetch(`${API_URL}/api/notes`);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  },

  async createNote(title, content) {
    const response = await fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  },

  async updateNote(id, title, content) {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  },

  async deleteNote(id) {
    const response = await fetch(`${API_URL}/api/notes/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');
    return response.json();
  },
};
