import React, {useEffect, useState} from 'react';

import FilterButton from '@/components/DropdownFilter';
// import Datepicker from '../components/Datepicker';
// import FilterButton from '../components/DropdownFilter';

// import Banner from '@/components/partials/Banner';
import Header from '@/components/Plugins/Header';
import Sidebar from '@/components/Plugins/Sidebar';

// import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
// import DashboardCard01 from '@/components/partials/dashboard/DashboardCard01';
// import DashboardCard02 from '../partials/dashboard/DashboardCard02';
// import DashboardCard03 from '../partials/dashboard/DashboardCard03';
// import DashboardCard04 from '../partials/dashboard/DashboardCard04';
// import DashboardCard05 from '../partials/dashboard/DashboardCard05';
// import DashboardCard06 from '../partials/dashboard/DashboardCard06';
// import DashboardCard07 from '../partials/dashboard/DashboardCard07';
// import DashboardCard08 from '../partials/dashboard/DashboardCard08';
// import DashboardCard09 from '../partials/dashboard/DashboardCard09';
// import DashboardCard11 from '../partials/dashboard/DashboardCard11';
// import DashboardCard12 from '../partials/dashboard/DashboardCard12';
// import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import TableComponent from '@/components/Table/TableComponent';
// import DashboardCard02 from "@/components/partials/dashboard/DashboardCard02";
import DashboardCard07 from "@/components/partials/dashboard/DashboardCard07";
import DashboardCard10 from "@/components/partials/dashboard/DashboardCard10";
import { useRouter } from 'next/router';
// import DashboardCard06 from "@/components/partials/dashboard/DashboardCard06";
// import DashboardCard03 from "@/components/partials/dashboard/DashboardCard03";
// import DashboardCard04 from "@/components/partials/dashboard/DashboardCard04";
// import DashboardCard05 from "@/components/partials/dashboard/DashboardCard05";


const Subpage = () => {
  const router = useRouter();
  const { subpage, id } = router.query;
  console.log("subpage", subpage, id)
  useEffect(() => {
    // Auto-redirect if subpage is 'analytics' to the static analytics page
    if (subpage === 'analytics') {
      // Retain the eval_id query parameter during the redirection
      router.replace({
        pathname: '/dashboard/analytics',
        query: { id }, // Passing eval_id if it's present
      });
    }
  }, [subpage, id]);

  const cards = (
    <div className="grid grid-cols-12 gap-6 ">
     {/*<DashboardCard01 />*/}
      {/*<DashboardCard02 />*/}
      {/*<DashboardCard03 />*/}
      {/*<DashboardCard04 />*/}

      {/*<DashboardCard05 />*/}
      {/*<DashboardCard06 />*/}
      {/* <DashboardCard07 />*/}
      {/*<DashboardCard10 />*/}
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
        <FilterButton/>
        {/* Datepicker built with flatpickr */}
        {/* <Datepicker /> */}
        {/* Add view button */}
        <button className="btn bg-nvidia-green hover:nvidia-green-hover text-white">
          <svg
            className="w-4 h-4 fill-current opacity-50 shrink-0"
            viewBox="0 0 16 16"
          >
            <path
              d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"/>
          </svg>
          <span className="xs:block ml-2">Add view</span>
        </button>
      </div>
      <div className="flex overflow-auto">
         Got into strange space
      </div>
      <div className="flex w-full">
        {/* <TableComponent></TableComponent> */}
      </div>
    </div>
  );
}

export default Subpage;
