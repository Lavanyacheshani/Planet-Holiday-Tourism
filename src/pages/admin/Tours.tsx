import React, { useEffect, useState } from 'react';

interface Tour {
  _id?: string;
  title: string;
  description: string;
  price: number;
  image?: string;
}

const Tours: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [form, setForm] = useState<Tour>({ title: '', description: '', price: 0, image: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');

  const fetchTours = async () => {
    const res = await fetch('http://localhost:5000/api/tours');
    const data = await res.json();
    setTours(data);
  };

  useEffect(() => { fetchTours(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/tours/${editingId}` : 'http://localhost:5000/api/tours';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save');
      setForm({ title: '', description: '', price: 0, image: '' });
      setEditingId(null);
      fetchTours();
    } catch (err) {
      setError('Error saving tour');
    }
  };

  const handleEdit = (tour: Tour) => {
    setForm(tour);
    setEditingId(tour._id || null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await fetch(`http://localhost:5000/api/tours/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTours();
    } catch {
      setError('Error deleting tour');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Tours</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-2">
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" className="border p-2 rounded w-full" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" required />
        <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" className="border p-2 rounded w-full" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'} Tour</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', price: 0, image: '' }); }} className="ml-2 px-4 py-2 rounded bg-gray-300">Cancel</button>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tours.map(tour => (
            <tr key={tour._id}>
              <td className="p-2 border">{tour.title}</td>
              <td className="p-2 border">{tour.description}</td>
              <td className="p-2 border">{tour.price}</td>
              <td className="p-2 border">{tour.image}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(tour)} className="mr-2 px-2 py-1 bg-yellow-400 rounded">Edit</button>
                <button onClick={() => handleDelete(tour._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tours; 