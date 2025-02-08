import React from 'react';

const UserCard = ({ user }) => {
    const { firstName, lastName, about, photoUrl, skills, age, gender } = user;
    const isProfile = location.pathname.includes('profile');
    const isConnection = location.pathname.includes('connections');

    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    src={photoUrl || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <div className="flex flex-col gap-6">
                    <h2 className="card-title text-decoration-line: underline">{firstName + " " + lastName}</h2>
                    <div>
                        <label>About: </label>
                        <p>{about}</p>
                    </div>
                    {skills.length!==0 &&
                        <div>
                            <label>Skills: </label>
                            <p>{skills.map((skill) => {
                                return skill + ", ";
                            })}</p>
                        </div>
                    }
                    {age && <p>Age: {age}</p>}
                    {gender && <p>Gender: {gender}</p>}
                </div>
                {!isProfile && !isConnection && <div className="card-actions justify-between mt-6">
                    <button className="btn btn-primary">Ignore</button>
                    <button className="btn btn-secondary">Interested</button>
                </div>}
            </div>
        </div>
    )
}

export default UserCard