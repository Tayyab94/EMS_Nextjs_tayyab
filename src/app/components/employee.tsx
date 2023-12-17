"use client"
import React, { useEffect, useState } from 'react'
import RemoveBtn from './removebtn'
import Link from "next/link"
import { HiPencilAlt } from "react-icons/hi"
import Image from 'next/image';
import { IEmployeeModel } from '@/models/user';
import axios from 'axios'


const getAllEmployees = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/employees");

        if (!res.ok) {
            throw new Error("Fail to Get Employees");
        }
        return res.json();
    } catch (error) {
        console.log("Error Loading Employees");
    }
}


const getAllEmployees_Axiso = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/employees", {
            headers: {
                'Cache-Control': 'no-cache',
            },
        });

        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

const Employee = async () => {

    const { data } = await getAllEmployees();


    // const [data, setData] = useState<IEmployeeModel[]>([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const data = await getAllEmployees_Axiso();
    //             console.log(data)
    //             setData(data);
    //         } catch (error) {
    //             // Handle any errors that might occur during the asynchronous operation
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []); // Empty dependency array ensures this effect runs only once on mount


    return (
        <>
            {
                data.map((item: any) => {
                    return <div key={item._id} className='flex justify-between items-center p-4 border border-slate-400 my-4 gap-5 '>
                        <div className='flex'> <Image alt='employe img' src={item.profileImage !== "" ? item.profileImage : null} width={30} height={40} />
                            <div className='ml-4'>
                                <h2 className='font-bold text-2xl'>{item.userName} </h2>
                                <div>
                                    Salary : <span>{item.salary} $</span> Age : <span>{item.age}</span>
                                </div>
                            </div>
                        </div>


                        <div className='flex  gap-2'>
                            <RemoveBtn id={item._id} />
                            <Link href={`edit-employee/${item._id}`}><HiPencilAlt size={24} /></Link>
                        </div>
                    </div>
                })
            }

        </>
    )
}

export default Employee
