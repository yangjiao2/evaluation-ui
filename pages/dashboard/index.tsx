

import React, { useState } from 'react';

import FilterButton from '@/components/DropdownFilter';
// import Datepicker from '../components/Datepicker';
// import FilterButton from '../components/DropdownFilter';

import Banner from '@/components/Plugins/Banner';
import Header from '@/components/Plugins/Header';
import Sidebar from '@/components/Plugins/Sidebar';
// import DashboardCard01 from '@/components/partials/dashboard/DashboardCard01';

function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const cards = (
    <div className="grid grid-cols-12 gap-6 ">
      {/* Line chart (Acme Plus) 
      
      <DashboardCard01 />
      <DashboardCard02 />
      <DashboardCard03 />
      <DashboardCard04 />
      
      <DashboardCard05 />
      <DashboardCard06 />
      
      */}
      {/* Line chart (Acme Advanced) */}
      {/* Line chart (Acme Professional) */}
      {/* Bar chart (Direct vs Indirect) */}
      {/* Line chart (Real Time Value) */}
      {/* Doughnut chart (Top Countries) */}
    </div>
  );
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {/* <Sidebar
        className="sidebar-expanded"
        sidebarOpen={sidebarOpen ?? true}
        setSidebarOpen={setSidebarOpen}
      /> */}

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        {/* <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">

              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              Dashboard
              </div>
            </div>
            {/* Cards */}
            {/* <div className="grid grid-cols-12 gap-6">
              <DashboardCard01 />
            </div> */}
            {/* <div className="flex w-full">
              <TableComponent></TableComponent>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardPage;
