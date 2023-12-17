"use client"
import React, { useState, useEffect } from 'react'
import APIUserProfile from "../components/apiUserProfile"
import { IUserModel } from '@/models/user';

import axios from "axios";



const ListApiEmployees = () => {

    const [userData, setUserData] = useState<IUserModel[]>([]);
    useEffect(() => {

        const fetchUserData = async () => {
            try {

                // const response = await fetch('https://reqres.in/api/users');
                // const data = await response.json();

                const response = await axios.get("https://reqres.in/api/users");

                if (response.status == 200) {
                    setUserData(response.data.data);
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchUserData();
    }, [])

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className=' grid grid-cols-1 divide-x md:grid-cols-2 lg:grid-cols-3'>
                        {
                            userData.map((user) => (
                                <APIUserProfile key={user.id} user={user} />
                            ))
                        }
                    </div>

                </div>
            </div>

        </>
    )
}

export default ListApiEmployees
