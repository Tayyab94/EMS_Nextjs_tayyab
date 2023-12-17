import { IUserModel } from '@/models/user';
import React from 'react';
import Modal from "react-modal"
import Image from "next/image";

interface UserModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    user: IUserModel
}
const UserModal = ({ isOpen, onRequestClose, user }: UserModalProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className="modal"
            ariaHideApp={false}
            overlayClassName="overlay"
        >
            <div className='flex flex-col justify-center items-center'>
                <Image className="w-24 h-24 mb-3 rounded-full shadow-lg" src={user.avatar} alt={`User Avatar for ${user.first_name}`} width={120} height={90} />

                <div>
                    <h1 className="text-2xl font-bold mb-2">{`${user.first_name} ${user.last_name}`}</h1>
                    <p className="text-gray-700">{`Email: ${user.email}`}</p>
                    {/* Add other user details here */}
                    <button className="text-white bg-slate-800 rounded-lg p-2 mt-3 hover:text-blue-700 hover:bg-orange-300" onClick={onRequestClose}>
                        Close
                    </button>
                </div>
            </div>

        </Modal>
    )
}

export default UserModal
