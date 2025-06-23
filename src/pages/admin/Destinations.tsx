import React, { useEffect, useState } from 'react';

interface Destination {
  _id?: string;
  name: string;
  description: string;
  image?: string;
}

const Destinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [form, setForm] = useState<Destination>({ name: '', description: '', image: '' });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('adminToken');

  const fetchDestinations = async () => {
    const res = await fetch('http://localhost:5000/api/destinations');
    const data = await res.json();
    setDestinations(data);
  };

  useEffect(() => { fetchDestinations(); }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const method = editingId ? 'PUT' : 'POST';
      const url = editingId ? `http://localhost:5000/api/destinations/${editingId}` : 'http://localhost:5000/api/destinations';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to save');
      setForm({ name: '', description: '', image: '' });
      setEditingId(null);
      fetchDestinations();
    } catch (err) {
      setError('Error saving destination');
    }
  };

  const handleEdit = (destination: Destination) => {
    setForm(destination);
    setEditingId(destination._id || null);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    try {
      await fetch(`http://localhost:5000/api/destinations/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDestinations();
    } catch {
      setError('Error deleting destination');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Destinations</h2>
      <form onSubmit={handleSubmit} className="mb-8 space-y-2">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-2 rounded w-full" required />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="border p-2 rounded w-full" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" className="border p-2 rounded w-full" />
        <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'} Destination</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', description: '', image: '' }); }} className="ml-2 px-4 py-2 rounded bg-gray-300">Cancel</button>}
        {error && <div className="text-red-500">{error}</div>}
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {destinations.map(destination => (
            <tr key={destination._id}>
              <td className="p-2 border">{destination.name}</td>
              <td className="p-2 border">{destination.description}</td>
              <td className="p-2 border">{destination.image}</td>
              <td className="p-2 border">
                <button onClick={() => handleEdit(destination)} className="mr-2 px-2 py-1 bg-yellow-400 rounded">Edit</button>
                <button onClick={() => handleDelete(destination._id)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Destinations; 