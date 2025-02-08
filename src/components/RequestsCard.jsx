import React, { useDebugValue } from 'react';
import { BASE_URL } from "../utils/constants";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestsSlice';

const RequestsCard = ({ requests }) => {
    const dispatch = useDispatch();
    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(BASE_URL + "/request/review/" + status + "/" + _id, {}, { withCredentials: true });
            dispatch(removeRequest(_id));
        }
        catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="carousel w-full">
            {requests.map((request, index) => (
                <div
                    key={request._id}
                    id={`slide${index}`}
                    className="carousel-item relative w-full flex p-6 bg-base-300 rounded-lg shadow-lg gap-6">
                        {console.log(request)}
                    <div className="w-1/3 flex items-center justify-center">
                        <img
                            src={request?.fromUserId?.profileImage || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQukleU1059SFH-flP36qRWECpm9pQfQ7f50Q&s"}
                            alt="request"
                            className="w-40 h-40 object-cover rounded-full border-4 border-gray-300"
                        />
                    </div>

                    <div className="w-2/3 p-4">
                        <h2 className="text-2xl font-bold">
                            {request?.fromUserId?.firstName || "Unknown"} {request?.fromUserId?.lastName || ""}
                        </h2>
                        <p className="text-gray-600">
                            {request?.fromUserId?.email || "No Email Provided"}
                        </p>
                        <p className="text-gray-500 mt-2">
                            Status:
                            <span className="font-semibold">{request?.status || "Pending"}</span>
                        </p>

                        <div className="mt-4 flex gap-4">
                            <button
                                className="px-4 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                                onClick={() => reviewRequest("accepted", request._id)}>
                                Accept
                            </button>
                            <button
                                className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
                                onClick={() => reviewRequest("rejected", request._id)}>
                                Reject
                            </button>
                        </div>
                    </div>

                    <div className="absolute left-2 right-14 top-1/2 flex -translate-y-1/2 transform justify-between px-4">
                        <a
                            href={`#slide${index === 0 ? requests.length - 1 : index - 1}`}
                            className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600"
                        >
                            ❮
                        </a>
                        <a
                            href={`#slide${index === requests.length - 1 ? 0 : index + 1}`}
                            className="btn btn-circle bg-gray-800 text-white hover:bg-gray-600"
                        >
                            ❯
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestsCard;
