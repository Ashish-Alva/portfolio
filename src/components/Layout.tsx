import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <div className="max-w-7xl mx-auto flex gap-6">
        <Sidebar />

        <main className="flex-1 min-w-0 ml-74">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;