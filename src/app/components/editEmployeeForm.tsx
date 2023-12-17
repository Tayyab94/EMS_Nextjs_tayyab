"use client"
import React, { useState } from 'react'

interface EditEmployeFormProps {
    userName: string,
    userSalary: string,
    userAge: string
}
const EditEmployeeForm = ({ userName, userSalary, userAge }: EditEmployeFormProps) => {


    const [employeeName, setEmployeeName] = useState(userName);
    const [employeeSalary, setEmployeeSalary] = useState(userSalary);
    const [employeeAge, setEmployeeAge] = useState(userAge);
    const [file, setFile] = useState(null);

    console.log(employeeName)

    const handleNameChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmployeeName(event.target.value);
    };

    const handleSalaryChange = (event: { target: { value: string; }; }) => {
        const value = event.target.value;
        // Allow only positive integers without decimals
        if (/^\d+$/.test(value) || value === '') {
            setEmployeeSalary(value);
        }
    };

    const handleAgeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setEmployeeAge(event.target.value);
    };

    const handleFileChange = (event: any) => {
        // Handle file input logic here
        // For example: setFile(event.target.files[0]);
    };
    return (
        <>
            <h3 className='text-2xl text-center text-sl mb-2'>Edit Employee</h3>
            <form className='flex flex-col gap-3'>
                <input type="text" className='border border-slate-300 px-8 py-3' placeholder='Employee Name' value={employeeName}
                    onChange={handleNameChange} />
                <input type="text" className='border border-slate-300 px-8 py-3' placeholder='Employee Salary' value={employeeSalary}
                    onChange={handleSalaryChange} />
                <input type="number" className='border border-slate-300 px-8 py-3' placeholder='Employee Age'
                    value={employeeAge}
                    onChange={handleAgeChange} />
                <input type="file" className='border border-slate-300 px-8 py-3' placeholder='Employee Name' />

                {employeeName.length > 25 && (
                    <p className="text-red-500">
                        Truncated Name: {employeeName.slice(0, 25)}...
                    </p>
                )}

                <button className='bg-green-400 text-white font-bold py-3 px-6 w-fit'>Edit Employee</button>
            </form>
        </>
    )
}

export default EditEmployeeForm
