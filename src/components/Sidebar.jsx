import { Link } from "react-router-dom";
import { FaTachometerAlt, FaMoneyBillWave, FaDollarSign, FaCreditCard, FaList } from "react-icons/fa"; // Import icons //modfy
import "../assets/styles/sidebar.css"; // Import CSS //modfy

const Sidebar = () => {
  return (
    <div className="sidebar ">
      {/* Sidebar Title */}
      <h2 className="sidebar-title">Expense Manager</h2>

      {/* Navigation */}
      <nav>
        <ul className="sidebar-menu">
          <li>
            <Link to="/">
              <FaTachometerAlt className="menu-icon" /> Dashboard {/*modfy*/}
            </Link>
          </li>
          <li>
            <Link to="/types-of-cost">
              <FaList className="menu-icon" /> Types of Cost {/*modfy*/}
            </Link>
          </li>
          <li>
            <Link to="/amount">
              <FaMoneyBillWave className="menu-icon" /> Amount {/*modfy*/}
            </Link>
          </li>
          <li>
            <Link to="/currency">
              <FaDollarSign className="menu-icon" /> Currency {/*modfy*/}
            </Link>
          </li>
          <li>
            <Link to="/payment-method">
              <FaCreditCard className="menu-icon" /> Payment Method {/*modfy*/}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
