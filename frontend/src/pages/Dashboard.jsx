import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faBox, faUserAlt, faTools, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import { useInventory } from '../hooks/useInventory';
import { useSuppliers } from '../hooks/useSupplier';
import { useMaintenance } from '../hooks/useMaintenance';

// Sample data for the bar chart (Inventory Overview)
const data = [
  { month: 'Jan', inventory: 120 },
  { month: 'Feb', inventory: 150 },
  { month: 'Mar', inventory: 130 },
  { month: 'Apr', inventory: 180 },
  { month: 'May', inventory: 200 },
  { month: 'Jun', inventory: 160 },
  { month: 'Jul', inventory: 190 },
  { month: 'Aug', inventory: 220 },
  { month: 'Sep', inventory: 210 },
  { month: 'Oct', inventory: 240 },
  { month: 'Nov', inventory: 230 },
  { month: 'Dec', inventory: 250 },
];

// Sample data for the pie chart (Inventory Distribution - School Products)
const pieData = [
  { name: 'Books', value: 400 },
  { name: 'Stationery', value: 300 },
  { name: 'Bags', value: 200 },
  { name: 'Uniforms', value: 100 },
];

// Sample data for the Top Products Horizontal Bar Chart
const topProductsData = [
  { name: 'Books', value: 400 },
  { name: 'Stationery', value: 300 },
  { name: 'Bags', value: 200 },
  { name: 'Uniforms', value: 100 },
];


// Custom label function to display both name and percentage
const renderCustomizedLabel = ({ name, percent }) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

export default function Dashboard() {
  const  { totalQuantity } = useInventory();
  const { totalSuppliers } = useSuppliers();
  const { totalMaintenance } = useMaintenance();
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Cards Container */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {/* Total Inventory Card */}
        <div className="card p-5 border border-gray-300 rounded-md shadow-sm bg-blue-100">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faBox} className="text-2xl text-blue-500" />
            <div>
              <h3 className="text-lg font-semibold text-blue-700">Total Inventory</h3>
              <p className="text-sm">{totalQuantity} Item & Assets</p>
            </div>
          </div>
        </div>

        {/* Supplier Card */}
        <div className="card p-5 border border-gray-300 rounded-md shadow-sm bg-green-100">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faUserAlt} className="text-2xl text-green-500" />
            <div>
              <h3 className="text-lg font-semibold text-green-700">Suppliers</h3>
              <p className="text-sm">{totalSuppliers} Suppliers</p>
            </div>
          </div>
        </div>

        {/* Maintenance Card */}
        <div className="card p-5 border border-gray-300 rounded-md shadow-sm bg-yellow-100">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faTools} className="text-2xl text-yellow-500" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-700">Maintenance</h3>
              <p className="text-sm">{totalMaintenance} Maintenance</p>
            </div>
          </div>
        </div>

        {/* Condemned Maintenance Card */}
        <div className="card p-5 border border-gray-300 rounded-md shadow-sm bg-red-100">
          <div className="flex items-center space-x-4">
            <FontAwesomeIcon icon={faTrash} className="text-2xl text-red-500" />
            <div>
              <h3 className="text-lg font-semibold text-red-700">Condemned Assets</h3>
              <p className="text-sm">50 Condemned</p>
            </div>
          </div>
        </div>

      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        {/* Inventory Overview Bar Chart */}
        <div className="card p-5 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Inventory Overview (Jan - Dec)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inventory" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inventory Distribution Pie Chart */}
        <div className="card p-5 border border-gray-300 rounded-md shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Inventory Distribution - School Products</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie 
                data={pieData} 
                dataKey="value" 
                nameKey="name" 
                outerRadius={100} 
                fill="#8884d8" 
                label={renderCustomizedLabel}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
                ))}
              </Pie>
              <Legend 
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                iconSize={20}
                iconType="circle"
                wrapperStyle={{ paddingTop: '10px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Purchases and Top Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
        
        <div className="card p-5 border border-gray-300 rounded-md shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Top Products</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topProductsData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
    </div>
  );
}
