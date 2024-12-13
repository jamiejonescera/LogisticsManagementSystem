import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSuppliers } from '../../hooks/useSupplier';

const UpdateProductModal = ({ isOpen, closeModal, handleUpdate, formValues, setFormValues }) => {
  const { suppliers, loading: loadingSuppliers } = useSuppliers();

  // Define category options based on product type
  const assetCategories = [
    "Classroom Furniture",
    "Electronics",
    "Sports Equipment",
    "Infrastructure",
    "Library Resources",
  ];

  const itemCategories = [
    "Stationery Supplies",
    "Teaching Materials",
    "Art Supplies",
    "Cleaning Supplies",
    "Medical Supplies",
  ];

  // Effect to reset category if product type changes
  useEffect(() => {
    if (formValues.productType === "asset" && !assetCategories.includes(formValues.category)) {
      setFormValues({ ...formValues, category: "" });
    } else if (formValues.productType === "item" && !itemCategories.includes(formValues.category)) {
      setFormValues({ ...formValues, category: "" });
    }
  }, [formValues.productType, formValues.category, setFormValues]);

  if (!isOpen) return null;

  const categoriesToDisplay = formValues.productType === "asset" ? assetCategories : itemCategories;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Update Product</h2>
        <form onSubmit={handleUpdate}>
          {/* Flex container for Supplier and Product Type */}
          <div className="mb-4 flex justify-between gap-4">
            <div className="w-full">
              <label htmlFor="supplierId" className="block text-sm font-medium text-gray-700">Supplier</label>
              <select
                id="supplierId"
                name="supplierId"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formValues.supplierId}
                onChange={(e) => setFormValues({ ...formValues, supplierId: e.target.value })}
                disabled={loadingSuppliers}
                required
              >
                <option value="">Select a Supplier</option>
                {!loadingSuppliers &&
                  suppliers.map((supplier) => (
                    <option key={supplier.supplier_id} value={supplier.supplier_id}>
                      {supplier.supplier_name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="w-full">
              <label htmlFor="productType" className="block text-sm font-medium text-gray-700">Product Type</label>
              <select
                id="productType"
                name="productType"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                value={formValues.productType}
                onChange={(e) => setFormValues({ ...formValues, productType: e.target.value })}
                required
              >
                <option value="">Select Product Type</option>
                <option value="asset">Asset</option>
                <option value="item">Item</option>
              </select>
            </div>
          </div>
          
          {/* Category, Product Name, Unit Price fields */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formValues.category}
              onChange={(e) => setFormValues({ ...formValues, category: e.target.value })}
              required
            >
              <option value="">Select a Category</option>
              {categoriesToDisplay.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            < label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              id="productName"
              name="productName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formValues.productName}
              onChange={(e) => setFormValues({ ...formValues, productName: e.target.value })}
              placeholder="Enter Product Name"
              required
              autoComplete="off"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="unitPrice" className="block text-sm font-medium text-gray-700">Unit Price</label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={formValues.unitPrice}
              onChange={(e) => setFormValues({ ...formValues, unitPrice: e.target.value })}
              placeholder="Enter Unit Price"
              required
              autoComplete="off"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={closeModal}
              className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProductModal;