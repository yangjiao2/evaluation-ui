import React, {useState, useEffect, useRef} from 'react';

// import { Link, useLocation } from "react-router-dom";
import Link from 'next/link';
import {useRouter} from 'next/router';

import SidebarLinkGroup from './SidebarLinkGroup';
// import { Callout } from '@/components/Tremor/Callout';

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
    // const location = useLocation();
    // const { pathname } = location;
    const {pathname} = useRouter();

    console.log('pathname', pathname);
    const trigger = useRef(null);
    const sidebar = useRef(null);

    const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
    // const storedSidebarExpanded = true;
    const [sidebarExpanded, setSidebarExpanded] = useState(
        storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
    );
    const isActive = false;
    console.log('sidebarOpen', sidebarOpen);
    // close on click outside
    // useEffect(() => {
    //   const clickHandler = ({ target }) => {
    //     if (!sidebar.current || !trigger.current) return;
    //     if (
    //       !sidebarOpen ||
    //       sidebar.current.contains(target)
    //       // ||
    //       // trigger.current.contains(target)
    //     )
    //       // setSidebarOpen(!sidebarOpen);
    //       return;
    //   };
    //   document.addEventListener('click', clickHandler);
    //   return () => document.removeEventListener('click', clickHandler);
    // });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({keyCode}) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });
    // console.log('sidebarExpanded: ', sidebarExpanded);
    // useEffect(() => {
    //   localStorage.setItem('sidebar-expanded', sidebarExpanded);
    //   if (sidebarExpanded) {
    //     document.querySelector('body').classList.add('sidebar-expanded');
    //   } else {
    //     document.querySelector('body').classList.remove('sidebar-expanded');
    //   }
    // }, [sidebarExpanded]);

    return (
        <div>
            {/* Sidebar backdrop (mobile only) */}
            <div
                className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
                    sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"
            ></div>

            {/* Sidebar */}
            <div
                id="sidebar"
                ref={sidebar}
                className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar 
          ${
                    sidebarOpen ? 'w-64' : 'w-20'
                }  shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-64'
                }`}
            >
                {/* Sidebar header */}
                <div className="flex justify-between mb-10 pr-3 sm:px-2">
                    {/* Close button */}
                    <button
                        ref={trigger}
                        className="text-slate-500 hover:text-slate-400 inline-flex"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-controls="sidebar"
                        aria-expanded={sidebarOpen}
                    >
                        <span className="sr-only">Close sidebar</span>
                        <svg
                            className="w-6 h-6 fill-current"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            transform={sidebarOpen ? '' : 'rotate(180)'}
                        >
                            <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z"/>
                        </svg>
                        {sidebarOpen ? <div
                            className="whitespace-nowrap rounded border px-1.5 py-0.5 font-mono text-sm font-semibold border-gray-700 bg-gray-400/20 text-slate-400 dark:border-gray-400/20 dark:bg-gray-400/10 dark:text-gray-50"> esc </div> : ''}
                    </button>
                </div>

                {/* Links */}
                <div className="space-y-8">
                    {/* Pages group */}
                    <div>
                        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                            <span className={``}>Pages</span>
                        </h3>
                        <ul className="mt-3">
                            {/* Dashboard */}
                            <SidebarLinkGroup
                                activecondition={
                                    pathname === '/home' || pathname.includes('dashboard')
                                }
                            >
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 truncate transition duration-150 ${
                                                    pathname === '/home' || pathname.includes('dashboard')
                                                        ? 'hover:text-slate-200'
                                                        : 'hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname === '/home' ||
                                                                    pathname.includes('dashboard')
                                                                        ? 'text-lime-500'
                                                                        : 'text-slate-400'
                                                                }`}
                                                                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                                                            />
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname === '/home' ||
                                                                    pathname.includes('dashboard')
                                                                        ? 'text-lime-600'
                                                                        : 'text-slate-600'
                                                                }`}
                                                                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                                                            />
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname === '/home' ||
                                                                    pathname.includes('dashboard')
                                                                        ? 'text-lime-200'
                                                                        : 'text-slate-400'
                                                                }`}
                                                                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                                                            />
                                                        </svg>
                                                        <span
                                                            className="text-sm font-medium ml-3  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Dashboard
                            </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                                                open ? 'rotate-180' : ''
                                                            }`}
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className={!sidebarOpen ? 'hidden' : ''}>
                                                <ul className={`pl-9 mt-1 ${!open ? 'hidden' : ''}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            // end
                                                            href="/dashboard/home"
                                                            className={
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-lime-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                              <span
                                  className="text-sm font-medium  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Home
                              </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/dashboard/analytics"
                                                            className={
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-lime-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                              <span
                                  className="text-sm font-medium  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Analytics
                              </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            {/* Evaluation */}
                            <SidebarLinkGroup
                                activecondition={pathname.includes('evaluation')}
                            >
                                {(handleClick, open) => {
                                    console.log("Evaluation pathname", pathname, pathname.includes('evaluation'))
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#1"
                                                className={`block text-slate-200 truncate transition duration-150 ${
                                                    pathname.includes('evaluation')
                                                        ? 'hover:text-slate-200'
                                                        : 'hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname === '/create' ||
                                                                    pathname.includes('evaluation')
                                                                        ? 'text-lime-200'
                                                                        : 'text-slate-400'
                                                                }`}
                                                                d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
                                                            />
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname.includes('evaluation')
                                                                        ? 'text-lime-600'
                                                                        : 'text-slate-700'
                                                                }`}
                                                                d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
                                                            />
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname.includes('evaluation')
                                                                        ? 'text-lime-500'
                                                                        : 'text-slate-600'
                                                                }`}
                                                                d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
                                                            />
                                                        </svg>
                                                        <span
                                                            className="text-sm font-medium ml-3  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Evaluation
                            </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                                                open ? 'rotate-180' : ''
                                                            }`}
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className={!sidebarOpen ? 'hidden' : ''}>
                                                <ul className={`pl-9 mt-1 ${!open ? 'hidden' : ''}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/evaluation/create"
                                                            className={
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-lime-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                              <span
                                  className="text-sm font-medium  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Create
                              </span>
                                                        </Link>
                                                    </li>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/evaluation/createapi"
                                                            className={
                                                                'block transition duration-150 truncate ' +
                                                                (isActive
                                                                    ? 'text-lime-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                                                              <span
                                                                  className="text-sm font-medium  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                                                       Create (API)
                                                               </span>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            {/* Help */}
                            <SidebarLinkGroup activecondition={pathname.includes('help')}>
                                {(handleClick, open) => {
                                    return (
                                        <React.Fragment>
                                            <a
                                                href="#0"
                                                className={`block text-slate-200 truncate transition duration-150 ${
                                                    pathname.includes('help')
                                                        ? 'hover:text-slate-200'
                                                        : 'hover:text-white'
                                                }`}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    sidebarExpanded
                                                        ? handleClick()
                                                        : setSidebarExpanded(true);
                                                }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <svg
                                                            className="shrink-0 h-6 w-6"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path
                                                                className={`fill-current ${
                                                                    pathname.includes('help')
                                                                        ? 'text-lime-500'
                                                                        : 'text-slate-400'
                                                                }`}
                                                                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
                                                            />
                                                        </svg>
                                                        <span
                                                            className="text-sm font-medium ml-3  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                              Help
                            </span>
                                                    </div>
                                                    {/* Icon */}
                                                    <div className="flex shrink-0 ml-2">
                                                        <svg
                                                            className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                                                open ? 'rotate-180' : ''
                                                            }`}
                                                            viewBox="0 0 12 12"
                                                        >
                                                            <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </a>
                                            <div className={!sidebarOpen ? 'hidden' : ''}>
                                                <ul className={`pl-9 mt-1 ${!open ? 'hidden' : ''}`}>
                                                    <li className="mb-1 last:mb-0">
                                                        <Link
                                                            href="/help"
                                                            className={
                                                                'block transition duration-150 truncate ' +
                                                                (pathname === '/help'
                                                                    ? 'text-lime-500'
                                                                    : 'text-slate-400 hover:text-slate-200')
                                                            }
                                                        >
                              <span
                                  className="text-sm font-medium  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                Resource & FAQ
                              </span>
                                                        </Link>
                                                    </li>
          
                                                </ul>
                                            </div>
                                        </React.Fragment>
                                    );
                                }}
                            </SidebarLinkGroup>

                            {/* Utility */}
                            {/*<SidebarLinkGroup activecondition={pathname.includes('utility')}>*/}
                            {/*    {(handleClick, open) => {*/}
                            {/*        return (*/}
                            {/*            <React.Fragment>*/}
                            {/*                <a*/}
                            {/*                    href="#0"*/}
                            {/*                    className={`block text-slate-200 truncate transition duration-150 ${*/}
                            {/*                        pathname.includes('utility')*/}
                            {/*                            ? 'hover:text-slate-200'*/}
                            {/*                            : 'hover:text-white'*/}
                            {/*                    }`}*/}
                            {/*                    onClick={(e) => {*/}
                            {/*                        e.preventDefault();*/}
                            {/*                        sidebarExpanded*/}
                            {/*                            ? handleClick()*/}
                            {/*                            : setSidebarExpanded(true);*/}
                            {/*                    }}*/}
                            {/*                >*/}
                            {/*                    <div className="flex items-center justify-between">*/}
                            {/*                        <div className="flex items-center">*/}
                            {/*                            <svg*/}
                            {/*                                className="shrink-0 h-6 w-6"*/}
                            {/*                                viewBox="0 0 24 24"*/}
                            {/*                            >*/}
                            {/*                                <circle*/}
                            {/*                                    className={`fill-current ${*/}
                            {/*                                        pathname.includes('utility')*/}
                            {/*                                            ? 'text-lime-300'*/}
                            {/*                                            : 'text-slate-400'*/}
                            {/*                                    }`}*/}
                            {/*                                    cx="18.5"*/}
                            {/*                                    cy="5.5"*/}
                            {/*                                    r="4.5"*/}
                            {/*                                />*/}
                            {/*                                <circle*/}
                            {/*                                    className={`fill-current ${*/}
                            {/*                                        pathname.includes('utility')*/}
                            {/*                                            ? 'text-lime-500'*/}
                            {/*                                            : 'text-slate-600'*/}
                            {/*                                    }`}*/}
                            {/*                                    cx="5.5"*/}
                            {/*                                    cy="5.5"*/}
                            {/*                                    r="4.5"*/}
                            {/*                                />*/}
                            {/*                                <circle*/}
                            {/*                                    className={`fill-current ${*/}
                            {/*                                        pathname.includes('utility')*/}
                            {/*                                            ? 'text-lime-500'*/}
                            {/*                                            : 'text-slate-600'*/}
                            {/*                                    }`}*/}
                            {/*                                    cx="18.5"*/}
                            {/*                                    cy="18.5"*/}
                            {/*                                    r="4.5"*/}
                            {/*                                />*/}
                            {/*                                <circle*/}
                            {/*                                    className={`fill-current ${*/}
                            {/*                                        pathname.includes('utility')*/}
                            {/*                                            ? 'text-lime-300'*/}
                            {/*                                            : 'text-slate-400'*/}
                            {/*                                    }`}*/}
                            {/*                                    cx="5.5"*/}
                            {/*                                    cy="18.5"*/}
                            {/*                                    r="4.5"*/}
                            {/*                                />*/}
                            {/*                            </svg>*/}
                            {/*                            <span*/}
                            {/*                                className="text-sm font-medium ml-3  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">*/}
                            {/*  Utility*/}
                            {/*</span>*/}
                            {/*                        </div>*/}
                            {/*                        /!* Icon *!/*/}
                            {/*                        <div className="flex shrink-0 ml-2">*/}
                            {/*                            <svg*/}
                            {/*                                className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${*/}
                            {/*                                    open ? 'rotate-180' : ''*/}
                            {/*                                }`}*/}
                            {/*                                viewBox="0 0 12 12"*/}
                            {/*                            >*/}
                            {/*                                <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"/>*/}
                            {/*                            </svg>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </a>*/}
                            {/*                <div className={!sidebarOpen ? 'hidden' : ''}>*/}
                            {/*                    <ul className={`pl-9 mt-1 ${!open ? 'hidden' : ''}`}>*/}
                            {/*                        <li className="mb-1 last:mb-0">*/}
                            {/*                            <Link*/}
                            {/*                                // end*/}
                            {/*                                href="/utility/subscription"*/}
                            {/*                                className={*/}
                            {/*                                    'block transition duration-150 truncate ' +*/}
                            {/*                                    (isActive*/}
                            {/*                                        ? 'text-lime-500'*/}
                            {/*                                        : 'text-slate-400 hover:text-slate-200')*/}
                            {/*                                }*/}
                            {/*                            >*/}
                            {/*  <span*/}
                            {/*      className="text-sm font-medium  sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">*/}
                            {/*    Subscription*/}
                            {/*  </span>*/}
                            {/*                            </Link>*/}
                            {/*                        </li>*/}
                            {/*                        <li className="mb-1 last:mb-0">*/}
                            {/*                            <Link*/}
                            {/*                                // end*/}
                            {/*                                href="/utility/faqs"*/}
                            {/*                                className={*/}
                            {/*                                    'block transition duration-150 truncate ' +*/}
                            {/*                                    (isActive*/}
                            {/*                                        ? 'text-lime-500'*/}
                            {/*                                        : 'text-slate-400 hover:text-slate-200')*/}
                            {/*                                }*/}
                            {/*                            >*/}
                            {/*  <span*/}
                            {/*      className="text-sm font-medium sm:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">*/}
                            {/*    FAQs*/}
                            {/*  </span>*/}
                            {/*                            </Link>*/}
                            {/*                        </li>*/}
                            {/*                    </ul>*/}
                            {/*                </div>*/}
                            {/*            </React.Fragment>*/}
                            {/*        );*/}
                            {/*    }}*/}
                            {/*</SidebarLinkGroup>*/}
                        </ul>
                    </div>
                </div>

                {/* Expand / collapse button */}
                {/* <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg
                className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                viewBox="0 0 24 24"
              >
                <path
                  className="text-slate-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-slate-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
