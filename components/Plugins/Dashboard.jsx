import React, { useState } from 'react';

import FilterButton from '@/components/DropdownFilter';
// import Datepicker from '../components/Datepicker';
// import FilterButton from '../components/DropdownFilter';

// import Banner from '@/components/partials/Banner';
import Header from '@/components/Plugins/Header';
import Sidebar from '@/components/Plugins/Sidebar';

// import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
// import DashboardCard01 from '../partials/dashboard/DashboardCard01';
// import DashboardCard02 from '../partials/dashboard/DashboardCard02';
// import DashboardCard03 from '../partials/dashboard/DashboardCard03';
// import DashboardCard04 from '../partials/dashboard/DashboardCard04';
// import DashboardCard05 from '../partials/dashboard/DashboardCard05';
// import DashboardCard06 from '../partials/dashboard/DashboardCard06';
// import DashboardCard07 from '../partials/dashboard/DashboardCard07';
// import DashboardCard08 from '../partials/dashboard/DashboardCard08';
// import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
// import DashboardCard11 from '../partials/dashboard/DashboardCard11';
// import DashboardCard12 from '../partials/dashboard/DashboardCard12';
// import DashboardCard13 from '../partials/dashboard/DashboardCard13';
// import WelcomeBanner from '../partials/dashboard/WelcomeBanner';

function Dashboard() {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div className="">
      {/* Right: Actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {/* Filter button */}
        <FilterButton />
        {/* Datepicker built with flatpickr */}
        {/* <Datepicker /> */}
        {/* Add view button */}
        <button className="btn bg-nvidia-green hover:nvidia-green-hover text-white">
          <svg
            className="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
          </svg>
          <span className="xs:block ml-2">Add view</span>
        </button>
      </div>
      <div className="flex overflow-auto">
        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">
          {/* Line chart (Acme Plus) */}
          {/* <DashboardCard01 /> */}
          {/* Line chart (Acme Advanced) */}
          {/* <DashboardCard10 /> */}
        </div>
      </div>
      {/* <div className="flex w-full">
              <TableComponent></TableComponent>
            </div> */}
    </div>
  );
}

export default Dashboard;
