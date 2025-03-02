import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-1 ml-64">
        <Header />
        <main className="p-4 bg-gray-100 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
export default Layout;