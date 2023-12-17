"use client"
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useRouter } from "next/navigation"
import axios from 'axios';


const AddEmployee = () => {

    const router = useRouter();

    const [employeeName, setEmployeeName] = useState('');
    const [employeeSalary, setEmployeeSalary] = useState('');
    const [employeeAge, setEmployeeAge] = useState('');
    const [file, setFile] = useState<File | string | null>(null);
    const [uploadStatus, setUploadStatus] = useState<string | ''>('');


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

    // const handleFileChange = (event: any) => {
    //     // Handle file input logic here
    //     // For example: setFile(event.target.files[0]);
    // };

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];

        if (selectedFile) {
            setFile(selectedFile || null);
        }
    };

    useEffect(() => {

        const update = async () => {
            const formData = new FormData();
            formData.set('image', file || "");
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            setUploadStatus(result.filePath)
        }
        update();
    }, [file])

    const handleFileUpload = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        // if (!file) return;
        if (!file) return;


        const formData = new FormData();

        formData.set('image', file);


        const response = await fetch('/api/upload', {

            method: 'POST',
            body: formData
        });

        const result = await response.json();

        setUploadStatus(result.filePath)

    };





    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!employeeName || !employeeAge || !employeeSalary) {
            alert("All Field Are Required")
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ employeeName, employeeSalary, employeeAge, uploadStatus })
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Faild to Create Employee");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <h3 className='text-2xl text-center text-sl mb-2'>Add New Employee</h3>
            <form onSubmit={handleSubmit} className='flex flex-col gap-3' encType="multipart/form-data">

                <input type="text" className='border border-slate-300 px-8 py-3' placeholder='Employee Name' value={employeeName}
                    onChange={handleNameChange} />
                <input type="text" className='border border-slate-300 px-8 py-3' placeholder='Employee Salary' value={employeeSalary}
                    onChange={handleSalaryChange} />
                <input type="text" className='border border-slate-300 px-8 py-3' placeholder='Employee Age'
                    value={employeeAge}
                    onChange={handleAgeChange} />


                <input type="file" name="image" className='border border-slate-300 px-8 py-3'
                    placeholder='Employee Name' onChange={handleFileChange} />

                {employeeName.length > 25 && (
                    <p className="text-red-500">
                        Truncated Name: {employeeName.slice(0, 25)}...
                    </p>
                )}
                <button className='bg-green-400 text-white font-bold py-3 px-6 w-fit'>Add Employee</button>

            </form>


            <form onSubmit={handleFileUpload} className='flex flex-col gap-3'>


                {/* <input type="file" name="image" className='border border-slate-300 px-8 py-3'
                    placeholder='Employee Name' onChange={(s) => setFile(s.target.files?.[0] || "")} /> */}


                <input type="text" className='border border-slate-300 px-8 py-3' value={uploadStatus} placeholder='Employee Age' />

                <button className='bg-green-400 text-white font-bold py-3 px-6 w-fit'>Upload File</button>
                {/* <button className='bg-green-400 text-white font-bold py-3 px-6 w-fit'>Add Employee</button> */}
            </form>
        </>
    )
}

export default AddEmployee
