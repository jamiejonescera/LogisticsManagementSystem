// import React, { useState } from 'react';
// import { usePurchase } from '../hooks/usePurchase';
// import toast from 'react-hot-toast';

// export default function PurchaseList() {
//   const { purchase, setPurchase, loading, error } = usePurchase();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedPurchaseId, setSelectedPurchaseId] = useState(null); 

//   // Handle deletion of a purchase request
//   const deletePurchaseRequest = async (requestId) => {
//     try {
//       const response = await fetch(`/api/purchase/delete/${requestId}`, {
//         method: 'DELETE',
//       });

//       if (!response.ok) {
//         const data = await response.json();
//         toast.error(data.error || 'Failed to delete the purchase request');
//       } else {
//         // Remove the deleted purchase request from the list
//         setPurchase(purchase.filter((item) => item.request_id !== requestId));
//         toast.success('Purchase cancelled successfully');
//       }
//       setIsModalOpen(false);
//     } catch (err) {
//       toast.error('An error occurred while deleting the purchase request');
//       setIsModalOpen(false); 
//     }
//   };

//   const openModal = (requestId) => {
//     setSelectedPurchaseId(requestId);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedPurchaseId(null);
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
//         <h2 className="text-2xl font-bold">Purchase List</h2>
//         <label className="input input-bordered flex items-center gap-20 mr-5">
//           <input type="text" className="grow" placeholder="Search" />
//           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
//             <path
//               fillRule="evenodd"
//               d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//               clipRule="evenodd"
//             />
//           </svg>
//         </label>
//       </div>

//       {/* Loading, Error, and Empty State Messages */}
//       {loading && (
//         <div className="flex justify-center items-center h-32">
//           <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-blue-600" role="status" />
//         </div>
//       )}
//       {error && (
//         <div className="flex justify-center items-center h-32 text-red-500">
//           <p>{error}</p>
//         </div>
//       )}
//       {purchase.length === 0 && !loading && !error && (
//         <div className="flex justify-center items-center h-32 text-gray-500">
//           <p>No Purchase available.</p>
//         </div>
//       )}

//       {/* Purchase Requests Table */}
//       <div className="relative overflow-y-auto max-h-[690px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
//         {purchase.length > 0 && (
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//               <tr>
//                 <th scope="col" className="px-6 py-4">Product Name</th>
//                 <th scope="col" className="px-6 py-4">Quantity</th>
//                 <th scope="col" className="px-6 py-4">Supplier Name</th>
//                 <th scope="col" className="px-6 py-4">Total Amount</th>
//                 <th scope="col" className="px-6 py-4">Status</th>
//                 <th scope="col" className="px-6 py-4">Request Date</th>
//                 <th scope="col" className="px-6 py-4">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {purchase.map((purchase, index) => (
//                 <tr key={`${purchase.request_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
//                   <td className="px-6 py-4">{purchase.product_name}</td>
//                   <td className="px-6 py-4">{purchase.quantity}</td>
//                   <td className="px-6 py-4">{purchase.supplier_name}</td>
//                   <td className="px-6 py-4">{new Intl.NumberFormat().format(purchase.total_amount)}</td>
//                   <td className="px-6 py-4">
//                     <span
//                       className={`${
//                         purchase.status === 'pending' ? 'text-orange-500' : ''
//                       } ${
//                         purchase.status === 'approved' ? 'text-green-500' : ''
//                       } ${
//                         purchase.status === 'rejected' ? 'text-red-500' : ''
//                       }`}
//                     >
//                       {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">{purchase.request_date}</td>
//                   <td className="px-6 py-4 flex space-x-2">
//                   <button
//                   onClick={() => openModal(purchase.request_id)} 
//                   className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center"
//                   >
//                   Cancel
//                 </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//    {/* Confirmation Modal */}
// {isModalOpen && (
//   <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
//     <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//       <h3 className="text-xl font-semibold mb-4">Are you sure you want to cancel this purchase?</h3>
//       <p className="text-sm text-gray-500 mb-4">
//         All of your data will be permanently removed. This action cannot be undone.
//       </p>
//       <div className="flex justify-end space-x-4">
//         <button
//           onClick={closeModal}
//             className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
//         >
//           No
//         </button>
//         <button
//           onClick={() => deletePurchaseRequest(selectedPurchaseId)}
//           className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
//         >
//           Yes
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//     </div>
//   );
// }
import React, { useState, useMemo } from 'react';
import { usePurchase } from '../hooks/usePurchase';
import toast from 'react-hot-toast';

export default function PurchaseList() {
  const { purchase, setPurchase, loading, error } = usePurchase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPurchaseId, setSelectedPurchaseId] = useState(null); 
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on the search term
  const filteredPurchases = useMemo(() => {
    if (!searchTerm) return purchase;
    const searchLower = searchTerm.toLowerCase();
    return purchase.filter((item) =>
      item.product_name.toLowerCase().includes(searchLower) ||
      item.supplier_name.toLowerCase().includes(searchLower) ||
      item.status.toLowerCase().includes(searchLower) ||
      item.quantity.toString().toLowerCase().includes(searchLower)
    );
  }, [purchase, searchTerm]);

  // Handle deletion of a purchase request
  const deletePurchaseRequest = async (requestId) => {
    try {
      const response = await fetch(`/api/purchase/delete/${requestId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete the purchase request');
      } else {
        // Remove the deleted purchase request from the list
        setPurchase(purchase.filter((item) => item.request_id !== requestId));
        toast.success('Purchase cancelled successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('An error occurred while deleting the purchase request');
      setIsModalOpen(false); 
    }
  };

  const openModal = (requestId) => {
    setSelectedPurchaseId(requestId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPurchaseId(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6 border-b-2 border-gray-500 pb-2">
        <h2 className="text-2xl font-bold">Purchase List</h2>
        <label className="input input-bordered flex items-center gap-20 mr-5">
          <input
            type="text"
            className="grow"
            placeholder="Search purchase"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
      {filteredPurchases.length === 0 && !loading && !error && (
        <div className="flex justify-center items-center h-32 text-gray-500">
          <p>No purchases found.</p>
        </div>
      )}

      {/* Purchase Requests Table */}
      <div className="relative overflow-y-auto max-h-[690px] shadow-md sm:rounded-lg mb-6 custom-scrollbar">
        {filteredPurchases.length > 0 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
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
              {filteredPurchases.map((purchase, index) => (
                <tr key={`${purchase.request_id}-${index}`} className="odd:bg-white even:bg-gray-50 border-b">
                  <td className="px-6 py-4">{purchase.product_name}</td>
                  <td className="px-6 py-4">{purchase.quantity}</td>
                  <td className="px-6 py-4">{purchase.supplier_name}</td>
                  <td className="px-6 py-4">{new Intl.NumberFormat().format(purchase.total_amount)}</td>
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
                    <button
                      onClick={() => openModal(purchase.request_id)} 
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 flex items-center"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h3 className="text-xl font-semibold mb-4">Are you sure you want to cancel this purchase?</h3>
            <p className="text-sm text-gray-500 mb-4">
              All of your data will be permanently removed. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
              >
                No
              </button>
              <button
                onClick={() => deletePurchaseRequest(selectedPurchaseId)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
