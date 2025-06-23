import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="space-y-4">
        <Link to="/admin/tours" className="block p-4 bg-blue-100 rounded hover:bg-blue-200">Manage Tours</Link>
        <Link to="/admin/blogs" className="block p-4 bg-green-100 rounded hover:bg-green-200">Manage Blogs</Link>
        <Link to="/admin/destinations" className="block p-4 bg-yellow-100 rounded hover:bg-yellow-200">Manage Destinations</Link>
      </div>
    </div>
  );
};

export default Dashboard; 