import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import BASE_URL from '../config';

useEffect(() => {
  fetch(`${BASE_URL}/api/endpoint`)
    .then(response => response.json())
    .then(data => console.log(data));
}, []);

const Logout = () => {
  return (
    <li>
      <a 
        className="text-white hover:bg-green-800 text-[15px] flex items-center rounded px-4 py-3 transition-all cursor-pointer"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        <span>Logout</span>
      </a>
    </li>
  );
};

export default Logout;
