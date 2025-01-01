import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";

export default function UpdateSupplierModal({
  showModal,
  setShowModal,
  supplierData,
  setSuppliers,
}) {
  const [formData, setFormData] = useState({
    supplier_name: "",
    contact_number: "",
  });

  // Load initial supplier data into form
  useEffect(() => {
    if (supplierData) {
      setFormData({
        supplier_name: supplierData.supplier_name || "",
        contact_number: supplierData.contact_number || "",
      });
    }
  }, [supplierData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/supplier/update/${supplierData.supplier_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Failed to update supplier");
      }

      setSuppliers((prev) => {
        const updatedSuppliers = prev.map((supplier) =>
          supplier.supplier_id === supplierData.supplier_id
            ? { ...supplier, ...data.supplier }
            : supplier
        );
        return updatedSuppliers.sort((a, b) => a.supplier_id - b.supplier_id);
      });

      toast.success("Supplier updated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error(error.message || "An unexpected error occurred");
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Supplier</h2>

        {/* Supplier Name */}
        <div className="mb-4">
          <label
            htmlFor="supplier_name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Supplier Name
          </label>
          <input
            type="text"
            id="supplier_name"
            name="supplier_name"
            value={formData.supplier_name}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter supplier name"
            autoComplete="off"
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label
            htmlFor="contact_number"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Number
          </label>
          <input
            type="text"
            id="contact_number"
            name="contact_number"
            value={formData.contact_number}
            onChange={(e) => {
              if (e.target.value.length <= 11) {
                handleInputChange(e);
              }
            }}
            className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter contact number"
            autoComplete="off"
            maxLength={11}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FontAwesomeIcon icon={faEdit} className="mr-2" />
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
