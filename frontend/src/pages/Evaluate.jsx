import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { usePurchase } from '../hooks/usePurchase';
import toast from 'react-hot-toast';

export default function PurchaseList() {
  const { purchase, setPurchase, loading, error } = usePurchase();

  // Filter the purchase requests to only include those with status 'pending'
  const pendingPurchases = purchase.filter((purchase) => purchase.status === 'pending');

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Evaluate Checklist</h2>
        <label className="input input-bordered flex items-center gap-20 mr-5">
          <input type="text" className="grow" placeholder="Search" />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
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
      {pendingPurchases.length === 0 && !loading && !error && (
        <div className="flex justify-center items-center h-32 text-gray-500">
          <p>No pending purchase requests.</p>
        </div>
      )}

      {/* Purchase Requests Table */}
      <div className="relative overflow-y-auto max-h-[690px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
        {pendingPurchases.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4">Request Id</th>
                <th scope="col" className="px-6 py-4">Product Name</th>
                <th scope="col" className="px-6 py-4">Quantity</th>
                <th scope="col" className="px-6 py-4">Supplier Name</th>
                <th scope="col" className="px-6 py-4">Total Amount</th>
                <th scope="col" className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-4">Request Date</th>
                <th scope="col" className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingPurchases.map((purchase, index) => (
                <tr key={`${purchase.request_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{purchase.request_id}</td>
                  <td className="px-6 py-4">{purchase.product_name}</td>
                  <td className="px-6 py-4">{purchase.quantity}</td>
                  <td className="px-6 py-4">{purchase.supplier_name}</td>
                  <td className="px-6 py-4">{purchase.total_amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`${
                        purchase.status === 'pending' ? 'text-orange-500' : ''
                      } ${
                        purchase.status === 'approved' ? 'text-green-500' : ''
                      } ${
                        purchase.status === 'rejected' ? 'text-red-500' : ''
                      }`}
                    >
                      {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">{purchase.request_date}</td>
                  <td className="px-6 py-4 flex space-x-2">
                    <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2">
                      <FontAwesomeIcon icon={faClipboardCheck} /> Evaluate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
