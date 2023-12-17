import React from 'react'
import Link from "next/link"
const Navbar = () => {
    return (
        <nav className='flex justify-between bg-slate-800 px-8 py-3 items-center'>
            <Link className='text-white font-bold' href={"/"}>EMS</Link>
            <Link className='text-white font-bold' href={"/list-api-employees"}>List API</Link>
            <Link className='bg-white p-2 rounded-md ' href={"/add-employee"}>Add New Employee</Link>
        </nav>
    )
}

export default Navbar
