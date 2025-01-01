// import React, { useEffect, useState } from 'react';


// const Header = () => {
//   const [currentDateTime, setCurrentDateTime] = useState('');

//   const updateDateTime = () => {
//     const options = { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric', 
//       hour: '2-digit', 
//       minute: '2-digit', 
//       second: '2-digit', 
//       hour12: true 
//     };
//     setCurrentDateTime(new Date().toLocaleString('en-US', options));
//   };

//   useEffect(() => {
//     updateDateTime();
//     const interval = setInterval(updateDateTime, 1000); 
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className='border-b font-[sans-serif] tracking-wide relative z-50'>
//       <div className='flex justify-between items-center px-10 py-4 text-white bg-green-700 min-h-[70px]'>
//         <div className='flex items-center'>
//             <p className='text-sm font-semibold mr-4'>Logistics Inventory Management System</p>
//         </div>

//         <p className='text-sm font-semibold'>{currentDateTime}</p>
//       </div>
//     </header>
//   );
// };

// export default Header;
import React, { useEffect, useState } from 'react';

const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');

  // Function to update the date and time
  const updateDateTime = () => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };
    setCurrentDateTime(new Date().toLocaleString('en-US', options));
  };

  useEffect(() => {
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000); 
    return () => clearInterval(interval); 
  }, []);

  return (
    <header className="border-b bg-green-800 shadow-lg font-sans tracking-wide z-50">
      <div className="flex justify-between items-center px-8 py-4 text-white max-w-screen-xl mx-auto">
        <div className="flex items-center space-x-4">
          {/* Add a logo or system title here */}
          <h1 className="text-xl font-semibold leading-tight">Logistics Inventory Management System</h1>
        </div>

        {/* Date and Time Display */}
        <div className="flex items-center text-sm font-medium">
          <p>{currentDateTime}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
