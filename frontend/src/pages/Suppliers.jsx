import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSuppliers } from '../hooks/useSupplier';
import toast from 'react-hot-toast'; 
import AddSupplierModal from '../components/modal/AddSupplierModal'; 

export default function Suppliers() {
  const { suppliers, loading, error, setSuppliers } = useSuppliers();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    supplier_name: '',
    address: '',
    contact_number: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSupplier = async () => {
    try {
      const response = await fetch('/api/supplier/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to create supplier');
      }
  
      setSuppliers((prev) => [...prev, data.supplier]);
  
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred');
    } finally {
      setFormData({ supplier_name: '', address: '', contact_number: '' });
      setShowModal(false);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      const response = await fetch(`/api/supplier/delete/${supplierId}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
  
      if (!response.ok || data.error) {
        throw new Error(data.error || 'Failed to delete supplier');
      }
  
      // Update the state to remove the deleted supplier
      setSuppliers((prev) => prev.filter(supplier => supplier.supplier_id !== supplierId));
  
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Supplier List</h2>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-2" /> SUPPLIER
          </button>
        </div>
      </div>

      {/* Loading, Error, and Empty State Messages */}
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600" role="status" />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-32 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {suppliers.length === 0 && !loading && !error && (
        <div className="flex justify-center items-center h-32 text-gray-500">
          <p>No Supplier available.</p>
        </div>
      )}

      <div className="relative overflow-y-auto max-h-[690px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
        {suppliers.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Supplier Id</th>
                <th scope="col" className="px-6 py-4">Supplier Name</th>
                <th scope="col" className="px-6 py-4">Address</th>
                <th scope="col" className="px-6 py-4">Contact Number</th>
                <th scope="col" className="px-6 py-4">Created at</th>
                <th scope="col" className="px-6 py-4">Updated at</th>
                <th scope="col" className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier, index) => (
                <tr key={`${supplier.supplier_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{supplier.supplier_name}</td>
                  <td className="px-6 py-4">{supplier.address}</td>
                  <td className="px-6 py-4">{supplier.contact_number}</td>
                  <td className="px-6 py-4">{supplier.created_at}</td>
                  <td className="px-6 py-4">{supplier.updated_at}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDeleteSupplier(supplier.supplier_id)}
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Show the modal */}
      <AddSupplierModal
        showModal={showModal}
        setShowModal={setShowModal}
        formData={formData}
        handleInputChange={handleInputChange}
        handleAddSupplier={handleAddSupplier}
      />
    </div>
  );
}
