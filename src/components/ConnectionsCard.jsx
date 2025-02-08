import React from 'react';

const ConnectionsCard = ({ users }) => {
    return (
        <div className="carousel w-full">
            {users.map((user, index) => (
                <div key={user._id} id={`slide${index}`} className="carousel-item relative w-full flex p-6 bg-base-300 rounded-lg shadow-lg gap-6">

                    {/* Left: User Image */}
                    <div className="w-1/3 flex items-center justify-center">
                        <img
                            src={user?.fromUserId?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQukleU1059SFH-flP36qRWECpm9pQfQ7f50Q&s"}
                            alt="User"
                            className="w-40 h-40 object-cover rounded-full border-4 border-gray-300"
                        />
                    </div>

                    {/* Right: User Details + Buttons */}
                    <div className="w-2/3 p-4">
                        <h2 className="text-2xl font-bold">{user?.fromUserId?.firstName || "Unknown"} {user?.fromUserId?.lastName || ""}</h2>
                        <p className="text-gray-600">{user?.fromUserId?.email || "No Email Provided"}</p>
                        <p className="text-gray-500 mt-2">Status: <span className="font-semibold">{user?.status || "Pending"}</span></p>

                        {/* Accept & Reject Buttons */}
                        <div className="mt-4 flex gap-4">
                            <button className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition">Accept</button>
                            <button className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition">Reject</button>
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="absolute left-2 right-14 top-1/2 flex -translate-y-1/2 transform justify-between px-4">
                        <a href={`#slide${index === 0 ? users.length - 1 : index - 1}`} className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">❮</a>
                        <a href={`#slide${index === users.length - 1 ? 0 : index + 1}`} className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600">❯</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ConnectionsCard;
