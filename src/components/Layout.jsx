// Layout.jsx
import React from "react";
import Navbar from "../pages/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="flex pt-16"> {/* pt-16 to account for Navbar height */}
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 bg-white shadow-lg p-6 fixed top-16 left-0 h-[calc(100vh-64px)]">
          <nav className="flex flex-col gap-4 mt-4">
            <a href="/dashboard" className="px-4 py-2 bg-yellow-200 rounded font-bold">Dashboard</a>
            <a href="/income" className="px-4 py-2 rounded hover:bg-yellow-100">Income</a>
            <a href="/expenses" className="px-4 py-2 rounded hover:bg-yellow-100">Expenses</a>
            <a href="/category" className="px-4 py-2 rounded hover:bg-yellow-100">Category</a>
            <a href="/filter" className="px-4 py-2 rounded hover:bg-yellow-100">Filter</a>
          </nav>
        </aside>
        {/* Main content */}
        <main className="flex-1 p-6 md:ml-64">
          <Outlet /> {/* Render page here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
