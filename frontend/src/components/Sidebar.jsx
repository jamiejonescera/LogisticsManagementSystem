import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faClipboardCheck,
  faShoppingCart,
  faBriefcase,
  faChevronDown,
  faBox,
  faTruck,
  faBuilding,
  faPlus,
  faList,  
  faExclamationTriangle,
  faWarehouse,
  faWrench,
  faPen
} from '@fortawesome/free-solid-svg-icons'; 
import Logout from './Logout';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const [isManagementsOpen, setIsManagementsOpen] = useState(false);
  const [isPurchasesOpen, setIsPurchasesOpen] = useState(false);
  const [isEvaluateOpen, setIsEvaluateOpen] = useState(false); 
  const [activeLink, setActiveLink] = useState();
  
  const location = useLocation();

  const toggleManagements = () => {
    setIsManagementsOpen(prevState => !prevState);
  };

  const togglePurchases = () => {
    setIsPurchasesOpen(prevState => !prevState);
  };

  const toggleEvaluate = () => {  
    setIsEvaluateOpen(prevState => !prevState);
  };

  const handleClick = (path) => {
    setActiveLink(path); 
  };

  const isActive = (path) => {
    return activeLink === path || location.pathname === path;
  };

  return (
    <nav className="bg-green-700 text-white h-screen fixed top-0 left-0 w-64 py-6 px-4"> 
      {/* Logo Section */}
      <div className="relative text-center mb-4">
        <h2 className="text-l font-bold mb-2">Flor De Grace</h2>
        <Link to="/">
          <img src={logo} alt="Logo" className="w-[80px] mx-auto" />
        </Link>
      </div>

      <div className="overflow-auto py-6 h-full mt-4">
        <ul className="space-y-1">
          {/* Dashboard Route */}
          <li>
            <Link 
              to="/dashboard"
              onClick={() => handleClick('/dashboard')}
              className={`text-white flex items-center rounded px-4 py-3 transition-all ${isActive('/dashboard') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
              <span>Dashboard</span>
            </Link>
          </li>

          <hr className="border-t border-gray-300 my-4" />

          {/* Evaluate Section Toggle */}
          <li>
            <button
              onClick={toggleEvaluate}
              className={`text-white hover:bg-green-800 text-[15px] flex items-center rounded px-4 py-3 transition-all w-full text-left ${isEvaluateOpen ? 'text-blue-600' : ''}`}
            >
              <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
              <span>Evaluate</span>
              <FontAwesomeIcon icon={faChevronDown} className={`ml-auto transform ${isEvaluateOpen ? 'rotate-180' : ''}`} />
            </button>
            {isEvaluateOpen && (
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/evaluate"
                    onClick={() => handleClick('/evaluate')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/evaluate') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faPen } className="mr-2" />
                    <span>Evaluate</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/evaluate-list"
                    onClick={() => handleClick('/evaluate-list')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/evaluate-list') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faList} className="mr-2" />
                    <span>Evaluate List</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/damage"
                    onClick={() => handleClick('/damage')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/damage') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle  } className="mr-2" />
                    <span>Damage Products</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <hr className="border-t border-gray-300 my-4" />

          {/* Purchase Section Toggle */}
          <li>
            <button
              onClick={togglePurchases}
              className={`text-white hover:bg-green-800 text-[15px] flex items-center rounded px-4 py-3 transition-all w-full text-left ${isPurchasesOpen ? 'text-blue-600' : ''}`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              <span>Purchase</span>
              <FontAwesomeIcon icon={faChevronDown} className={`ml-auto transform ${isPurchasesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isPurchasesOpen && (
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/purchase-request"
                    onClick={() => handleClick('/purchase-request')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/purchase-request') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    <span>Purchase Request</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/purchase-request-list"
                    onClick={() => handleClick('/purchase-request-list')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/purchase-request-list') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faList} className="mr-2" />
                    <span>Purchase List</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <hr className="border-t border-gray-300 my-4" />

          {/* Management Toggle */}
          <li>
            <button
              onClick={toggleManagements}
              className={`text-white hover:bg-green-800 text-[15px] flex items-center rounded px-4 py-3 transition-all w-full text-left ${isManagementsOpen ? 'text-blue-600' : ''}`}
            >
              <FontAwesomeIcon icon={faBriefcase} className="mr-2" />
              <span>Management</span>
              <FontAwesomeIcon icon={faChevronDown} className={`ml-auto transform ${isManagementsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isManagementsOpen && (
              <ul className="pl-6 mt-1 space-y-1">
                <li>
                  <Link 
                    to="/products"
                    onClick={() => handleClick('/products')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/products') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faBox} className="mr-2" />
                    <span>Products</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/suppliers"
                    onClick={() => handleClick('/suppliers')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/suppliers') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faTruck} className="mr-2" />
                    <span>Suppliers</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/departments"
                    onClick={() => handleClick('/departments')}
                    className={`text-white flex items-center rounded px-4 py-2 transition-all ${isActive('/departments') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
                  >
                    <FontAwesomeIcon icon={faBuilding} className="mr-2" />
                    <span>Department Facility</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Inventory Route */}
          <hr className="border-t border-gray-300 my-4" />
          <li>
           <Link 
          to="/inventory"
          onClick={() => handleClick('/inventory')}
          className={`text-white flex items-center rounded px-4 py-3 transition-all ${isActive('/inventory') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
            >
          <FontAwesomeIcon icon={faWarehouse} className="mr-2" />
          <span>Inventory</span>
          </Link>
          </li>

          {/* Inventory Route */}
          <hr className="border-t border-gray-300 my-4" />
          <li>
           <Link 
          to="/maintenance"
          onClick={() => handleClick('/maintenance')}
          className={`text-white flex items-center rounded px-4 py-3 transition-all ${isActive('/maintenance') ? 'bg-green-800' : 'hover:bg-green-800'} text-[15px]`}
            >
          <FontAwesomeIcon icon={faWrench} className="mr-2" />
          <span>Maintenance</span>
          </Link>
          </li>

          {/* Logout Section */}
          <hr className="border-t border-gray-300 my-4" />
          
          <div className="mt-auto">
            <ul className="space-y-1">
              <Logout />
            </ul>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
