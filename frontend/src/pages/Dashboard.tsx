import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSales: 0,
    averageOrderValue: 0,
    availableTables: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reports/sales`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">{stats.totalOrders}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">${stats.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Avg Order Value</h3>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">${stats.averageOrderValue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Available Tables</h3>
          <p className="mt-2 text-3xl font-extrabold text-gray-900">{stats.availableTables}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
