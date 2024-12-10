import React from 'react'
import { Link, Outlet, useLocation } from 'react-router'

const layout = () => {
    const location = useLocation();

    return (
        <div className='m-10'>
            <div className='flex items-center justify-between w-full'>
                <h1 className='text-5xl text-gray-50 font-knewave'>Friends Connect</h1>

                <Link to={location.pathname === '/signup' ? '/login' : '/signup'} className='text-accent2 underline'>
                    {location.pathname === '/signup' ? 'Login instead?' : 'signup instead?'}
                </Link>
            </div>
            <Outlet />
        </div>
    )
}

export default layout
