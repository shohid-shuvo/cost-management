import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[250px] px-5 h-screen bg-gray-900 text-white py-4 ">
      <div className="fixed">
       
        <h2 className="text-2xl font-bold mb-4">Expense Manager</h2>
        <nav>
          <ul className="space-y-2">
            <li><Link to="/" className="block p-2 rounded hover:bg-gray-700">Dashboard</Link></li>
            <li><Link to="/types-of-cost" className="block p-2 rounded hover:bg-gray-700">Types of Cost</Link></li>
            <li><Link to="/amount" className="block p-2 rounded hover:bg-gray-700">Amount</Link></li>
            <li><Link to="/currency" className="block p-2 rounded hover:bg-gray-700">Currency</Link></li>
            <li><Link to="/payment-method" className="block p-2 rounded hover:bg-gray-700">Payment Method</Link></li>
          </ul>
        </nav>
      </div>
     
    </div>
  );
};
export default Sidebar;