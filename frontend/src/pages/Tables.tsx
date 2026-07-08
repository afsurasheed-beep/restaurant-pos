import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

interface Table {
  id: string;
  tableNumber: number;
  capacity: number;
  status: string;
}

const Tables: React.FC = () => {
  const [tables, setTables] = useState<Table[]>([]);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tables`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTables(response.data);
    } catch (error) {
      console.error('Failed to fetch tables:', error);
    }
  };

  const handleStatusChange = async (tableId: string, newStatus: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/tables/${tableId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTables(tables.map((t) => (t.id === tableId ? response.data : t)));
    } catch (error) {
      console.error('Failed to update table:', error);
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`p-4 rounded-lg text-center cursor-pointer transition-all ${
              table.status === 'available'
                ? 'bg-green-100 hover:bg-green-200'
                : table.status === 'occupied'
                ? 'bg-red-100 hover:bg-red-200'
                : table.status === 'reserved'
                ? 'bg-yellow-100 hover:bg-yellow-200'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <h3 className="text-lg font-semibold">Table {table.tableNumber}</h3>
            <p className="text-sm text-gray-600">Capacity: {table.capacity}</p>
            <select
              value={table.status}
              onChange={(e) => handleStatusChange(table.id, e.target.value)}
              className="mt-2 w-full px-2 py-1 border border-gray-300 rounded text-sm"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="reserved">Reserved</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Tables;
