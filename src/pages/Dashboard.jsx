import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchNotes();
      fetchFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: false });

    if (!error) {
      setNotes(data);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('notes').insert([
      { title, content, user_id: user.id }
    ]);
    if (!error) {
      setTitle('');
      setContent('');
      fetchNotes();
    }
  };

  const fetchFiles = async () => {
    const { data, error } = await supabase.storage.from('documents').list('public');
    if (!error && data) {
      const urls = data.map(item => {
        const { data: publicUrl } = supabase.storage.from('documents').getPublicUrl(`public/${item.name}`);
        return { name: item.name, url: publicUrl.publicUrl };
      });
      setFiles(urls);
    }
  };

  const uploadFile = async (e) => {
    e.preventDefault();
    if (!file) return;
    const filePath = `public/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage.from('documents').upload(filePath, file);
    if (!error) {
      setFile(null);
      fetchFiles();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div>
          <span className="mr-4">Logged in as {user?.email}</span>
          <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Notes Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Notes</h2>
          <form onSubmit={addNote} className="mb-6">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border p-2 mb-2"
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={e => setContent(e.target.value)}
              className="w-full border p-2 mb-2 h-24"
              required
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Note</button>
          </form>

          <ul>
            {notes.map(note => (
              <li key={note.id} className="border p-4 mb-2 rounded">
                <h3 className="font-bold">{note.title}</h3>
                <p>{note.content}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Storage Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Storage</h2>
          <form onSubmit={uploadFile} className="mb-6">
            <input
              type="file"
              onChange={e => setFile(e.target.files[0])}
              className="mb-2"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Upload</button>
          </form>

          <ul>
            {files.map(f => (
              <li key={f.name} className="mb-2">
                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  {f.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;