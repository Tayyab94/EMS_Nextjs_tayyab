import EditEmployeeForm from '@/app/components/editEmployeeForm'
import { IEmployeeModel } from '@/models/user';
import React from 'react'

interface EditEmployeeProps {
    params: {
        id: string; // Assuming id is a string, update the type accordingly
        // Add other properties if needed
    };
}



const GetEmployById = async (id: string) => {
    try {
        const res = await fetch(`http://localhost:3000/api/employees/${id}`, {
            cache: "no-cache"
        });

        if (!res.ok) {
            throw new Error("Failed to get employee");
        }

        return res.json();
    } catch (error) {
        console.log(error)
    }
}
const EditEmployee = async ({ params }: EditEmployeeProps) => {
    const { id } = params;

    const emp = await GetEmployById(id);

    const { UserName: userName, Salary: salary, Age: age } = emp;
    // const { userName, salary, age } = emp;


    console.log(userName)
    return (
        <h3>as</h3>
        // <EditEmployeeForm userName={userName} userSalary={salary} userAge={age} />
    )
}

export default EditEmployee
