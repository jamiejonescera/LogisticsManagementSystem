import React, { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import { toast } from 'react-hot-toast';
import { useRecentPurchase } from '../hooks/useRecentPurchase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function Purchase() {
  const { products } = useProducts();
  const { recentpurchase, setRecentPurchase, loading, error } = useRecentPurchase();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleProductChange = (event) => {
    const productId = parseInt(event.target.value);
    const product = products.find((p) => p.product_id === productId);
    setSelectedProduct(product);
    setQuantity(0);
  };

  const handleQuantityChange = (event) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value ? parseInt(value, 10) : '');
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      setTotalAmount(quantity * selectedProduct.unit_price);
    } else {
      setTotalAmount(0);
    }
  }, [quantity, selectedProduct]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedProduct && quantity > 0) {
      const purchaseData = {
        product_id: selectedProduct.product_id,
        quantity: quantity,
      };

      try {
        const response = await fetch('/api/purchase/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(purchaseData),
        });

        if (response.ok) {
          const data = await response.json();
          toast.success(data.message || 'Purchase request created successfully');

          const newPurchase = {
            request_id: data.request_id,
            product_name: selectedProduct.name,
            quantity: quantity,
            supplier_name: selectedProduct.supplier_name,
            total_amount: selectedProduct.unit_price * quantity,
            status: 'pending',
            request_date: new Date().toUTCString(),
          };

          const updatedRecentPurchases = [newPurchase, ...recentpurchase].slice(0, 5);
          setRecentPurchase(updatedRecentPurchases);

          setSelectedProduct(null);
          setQuantity(0);
        } else {
          const data = await response.json();
          toast.error(data.message || 'Error creating purchase request');
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    } else {
      toast.error('Please select a product and enter a valid quantity');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Add Purchase Request</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product</label>
              <select
                className="mt-1 block w-full px-4 py-2 border rounded-md text-sm"
                onChange={handleProductChange}
                required
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.product_id} value={product.product_id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                type="text"
                value={selectedProduct ? selectedProduct.category : ''}
                className="mt-1 block w-full px-4 py-2 border rounded-md text-sm"
                placeholder="Category"
                readOnly
              />
            </div>
          </div>
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Supplier Name</label>
                <input
                  type="text"
                  value={selectedProduct.supplier_name}
                  className="mt-1 block w-full px-4 py-2 border rounded-md text-sm"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Unit Price</label>
                <input
                  type="text"
                  // value={selectedProduct.unit_price}
                  value={new Intl.NumberFormat('en-US').format(selectedProduct.unit_price)}
                  className="mt-1 block w-full px-4 py-2 border rounded-md text-sm"
                  readOnly
                />
              </div>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm"
              required
              placeholder='0'
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Amount</label>
            <input
              type="text"
              value={new Intl.NumberFormat('en-US').format(totalAmount)}
              className="mt-1 block w-full px-4 py-2 border rounded-md text-sm"
              readOnly
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-700 text-white rounded-md hover:bg-green-800"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />  PURCHASE
            </button>
          </div>
        </form>
      </div>
      <h2 className="text-xl font-bold mb-4">Recent Purchases</h2>
      {loading && (
        <div className="flex justify-center items-center h-32">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600"
            role="status"
          />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center h-32 text-red-500">
          <p>{error}</p>
        </div>
      )}
      {recentpurchase.length === 0 && !loading && !error && (
        <div className="flex justify-center items-center h-32 text-gray-500">
          <p>No Recent Purchase available.</p>
        </div>
      )}
      <div className="relative overflow-y-auto max-h-[690px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
        {recentpurchase.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Product Name</th>
                <th scope="col" className="px-6 py-4">Quantity</th>
                <th scope="col" className="px-6 py-4">Supplier Name</th>
                <th scope="col" className="px-6 py-4">Total Amount</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Request Date</th>
              </tr>
            </thead>
            <tbody>
              {recentpurchase.map((recent, index) => (
                <tr key={`${recent.request_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{recent.product_name}</td>
                  <td className="px-6 py-4">{recent.quantity}</td>
                  <td className="px-6 py-4">{recent.supplier_name}</td>
                  <td className="px-6 py-4">{new Intl.NumberFormat().format(recent.total_amount)}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`
                        ${recent.status === 'pending' ? 'text-orange-500' : ''}
                        ${recent.status === 'approved' ? 'text-green-500' : ''}
                        ${recent.status === 'rejected' ? 'text-red-500' : ''}
                      `}
                    >
                      {recent.status.charAt(0).toUpperCase() + recent.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{recent.request_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
