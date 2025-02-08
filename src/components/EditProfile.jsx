import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addUser, removeUser } from '../utils/userSlice';

const EditProfile = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [about, setAbout] = useState('');
    const [skills, setSkills] = useState([]);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    useEffect(() => {
        if (user) {
            setFirstName(user.firstName || '');
            setLastName(user.lastName || '');
            setAbout(user.about || '');
            setAge(user.age || '');
            setGender(user.gender || '');
            setSkills(user.skills || []);
        }
    }, [user]);

    const handleProfileUpdate = async () => {
        try {
            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName,
                lastName,
                about,
                age,
                gender,
                skills
            }, { withCredentials: true });

            dispatch(removeUser());
            dispatch(addUser(res?.data?.loggedInUser));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (err) {
            setError(err?.response?.data || "Something went wrong!!");
        }
    };

    return (
        <>
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
                                    <span className="label-text">Age</span>
                                </div>
                                <input
                                    type="text"
                                    value={age}
                                    placeholder="Type here"
                                    onChange={(e) => setAge(e.target.value)}
                                    className="input input-bordered w-full max-w-xs" />
                            </label>
                            <label className="form-control w-full max-w-xs">
                                <div className="label">
                                    <span className="label-text">Select Gender</span>
                                </div>
                                <select
                                    className="select select-bordered"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Pick one
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="others">Others</option>
                                </select>
                            </label>
                            <label className="form-control">
                                <div className="label">
                                    <span className="label-text">About</span>
                                </div>
                                <textarea
                                    className="textarea textarea-bordered h-24"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    placeholder="Bio"></textarea>
                            </label>
                        </div>
                        <p className='text-red-400'>{error}</p>
                        <div className="card-actions justify-center">
                            <button className="btn btn-primary" onClick={handleProfileUpdate}>Save Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && <div className="toast toast-top toast-end">
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>}
        </>
    );
};

export default EditProfile;
