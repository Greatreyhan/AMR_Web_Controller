import Link from 'next/link'
import React from 'react'

const Navigation = () => {
    return (
    <div className='w-full bg-slate-900 backdrop-blur-sm bg-opacity-70 fixed z-50'>
        <nav className="flex flex-wrap items-center justify-between p-4 mx-16">
            <div className="w-auto flex justify-center lg:order-2 lg:w-1/5 lg:text-center">
                <img className='w-28' src={'./Logo.png'} />
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 rounded navbar-burger">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>
                            Menu
                        </title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                        </path>
                    </svg>
                </button>
            </div>
            <div className="hidden w-full navbar-menu lg:order-1 lg:block lg:w-2/5">
                <Link className="block mt-4 mr-10 text-yellow-400 lg:inline-block lg:mt-0 hover:text-yellow-300 text-opacity-70 hover:text-opacity-90" href="/Controls">
                    Controls
                </Link>
                <Link className="block mt-4 mr-10 text-yellow-400 lg:inline-block lg:mt-0 hover:text-yellow-300 text-opacity-70 hover:text-opacity-90" href="/Calibration">
                    Calibration
                </Link>
                <Link className="block mt-4 text-yellow-400 lg:inline-block lg:mt-0 hover:text-yellow-300 text-opacity-70 hover:text-opacity-90" href="/Astar">
                    Algorithm
                </Link>
            </div>
            <div className="hidden w-full navbar-menu lg:order-3 lg:block lg:w-2/5 lg:text-right">
                <Link className="block mt-4 mr-10 text-yellow-400 lg:inline-block lg:mt-0 hover:text-yellow-300 text-opacity-70 hover:text-opacity-90" href="/Logs">
                    Logs
                </Link>
                <Link className="block mt-4 mr-10 text-yellow-400 lg:inline-block lg:mt-0 hover:text-yellow-300 text-opacity-70 hover:text-opacity-90" href="/Manual">
                    Manual
                </Link>
                <Link className="block mt-4 text-yellow-400 lg:inline-block lg:mt-0 hover:text-yellow-300 text-opacity-70 hover:text-opacity-90" href="/Connection">
                    Connection
                </Link>
            </div>
        </nav>
    </div>
    )
}

export default Navigation