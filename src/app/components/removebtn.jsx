import React from 'react'
import { HiTrash } from "react-icons/hi"
import { useRouter } from "next/navigation"
import axios from "axios"

const RemoveBtn = ({ id }) => {
    const router = useRouter();
    const remoteEmployee = async () => {
        const confirmed = confirm("Are you sure");
        if (confirmed) {
            const res = await axios.delete(`http://localhost:3000/api/employees?id=${id}`);
            if (res.status == 200) {
                router.refresh();
            }
        }
    }
    return (
        <>
            <button className='text-red-400' onClick={remoteEmployee}><HiTrash size={24} /></button>
        </>
    )
}

export default RemoveBtn
