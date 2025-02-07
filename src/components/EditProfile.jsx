import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    console.log(user);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [about, setAbout] = useState('');
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setAbout(user.about || '');
        }
    }, [user]);

    const handleProfileUpdate = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                about,
            }, { withCredentials: true });

            console.log(res);
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!!");
        }
    };

    return (
        <div className='flex justify-center'>
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">Edit Profile</h2>
                    <div>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">First Name</span>
                            </div>
                            <input
                                type="text"
                                value={firstName}
                                placeholder="Type here"
                                onChange={(e) => setFirstName(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Last Name</span>
                            </div>
                            <input
                                type="text"
                                value={lastName}
                                placeholder="Type here"
                                onChange={(e) => setLastName(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">About</span>
                            </div>
                            <input
                                type="text"
                                value={about}
                                placeholder="Type here"
                                onChange={(e) => setAbout(e.target.value)}
                                className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <p className='text-red-400'>{error}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary" onClick={handleProfileUpdate}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
