import React, { useEffect, useState } from 'react';

interface Blog {
  _id?: string;
  title: string;
  content: string;
  image?: string;
}

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<Blog>({ title: '', content: '', image: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');

  const fetchBlogs = async () => {
    const res = await fetch('http://localhost:5000/api/blogs');
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/blogs/${editingId}` : 'http://localhost:5000/api/blogs';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save');
      setForm({ title: '', content: '', image: '' });
      setEditingId(null);
      fetchBlogs();
    } catch (err) {
      setError('Error saving blog');
    }
  };

  const handleEdit = (blog: Blog) => {
    setForm(blog);
    setEditingId(blog._id || null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchBlogs();
    } catch {
      setError('Error deleting blog');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Blogs</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded w-full" required />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" className="border p-2 rounded w-full" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'} Blog</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', content: '', image: '' }); }} className="ml-2 px-4 py-2 rounded bg-gray-300">Cancel</button>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Content</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog._id}>
              <td className="p-2 border">{blog.title}</td>
              <td className="p-2 border">{blog.content}</td>
              <td className="p-2 border">{blog.image}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(blog)} className="mr-2 px-2 py-1 bg-yellow-400 rounded">Edit</button>
                <button onClick={() => handleDelete(blog._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs; 