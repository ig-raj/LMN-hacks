import React, { useEffect, useState } from 'react';
import CourseService from '../../services/courseService';

const NotesList = ({ courseId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    CourseID: courseId,
    title: '',
    topic: '',
    subject: '',
    url: '',
    class: '',
  });
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch notes on component mount
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notesData = await CourseService.getNotesByCourseId(courseId);
        setNotes(notesData);
      } catch (error) {
        setMessage('Failed to load notes.');
      }
    };
    fetchNotes();
  }, [courseId]);

  // Handle creating a new note
  const handleCreateNote = async () => {
    try {
      const createdNote = await CourseService.createNote(newNote);
      setNotes([...notes, createdNote]); // Update notes list
      setNewNote({ CourseID: courseId, title: '', topic: '', subject: '', url: '', class: '' }); // Reset form
      setMessage('Note added successfully!');
    } catch (error) {
      setMessage('Failed to add note.');
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (noteId) => {
    try {
      await CourseService.deleteNote(noteId);
      setNotes(notes.filter((note) => note.$id !== noteId)); // Remove deleted note from list
      setMessage('Note deleted successfully!');
    } catch (error) {
      setMessage('Failed to delete note.');
    }
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Course Notes</h2>
      {message && (
        <p className={`mb-4 text-center ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
      <div className="text-center mb-4">
        <button
          onClick={toggleFormVisibility}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          {isFormVisible ? 'Close Form' : 'Add New Note'}
        </button>
      </div>

      {isFormVisible && (
        <div className="p-4 border border-gray-200 rounded-lg mb-4">
          <h3 className="text-xl font-semibold mb-3">Add New Note</h3>
          <input
            type="text"
            placeholder="Title"
            value={newNote.title}
            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            required
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Topic"
            value={newNote.topic}
            onChange={(e) => setNewNote({ ...newNote, topic: e.target.value })}
            required
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Subject"
            value={newNote.subject}
            onChange={(e) => setNewNote({ ...newNote, subject: e.target.value })}
            required
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="URL"
            value={newNote.url}
            onChange={(e) => setNewNote({ ...newNote, url: e.target.value })}
            required
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Class"
            value={newNote.class}
            onChange={(e) => setNewNote({ ...newNote, class: e.target.value })}
            required
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleCreateNote}
            className="w-full px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Add Note
          </button>
        </div>
      )}

      {/* List of Notes */}
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.$id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{note.title}</h3>
            <p className="text-sm text-gray-700">Topic: {note.topic}</p>
            <p className="text-sm text-gray-700">Subject: {note.subject}</p>
            <a
              href={note.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              View Resource
            </a>
            <button
              onClick={() => handleDeleteNote(note.$id)}
              className="block mt-2 px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition duration-200"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesList;
