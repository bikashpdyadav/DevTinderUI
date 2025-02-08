import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addRequests } from "../utils/requestsSlice";
import { BASE_URL } from '../utils/constants';
import RequestsCard from './RequestsCard';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", { withCredentials: true });
            dispatch(addRequests(res?.data?.connectionRequests));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests) return;
    if (requests.length === 0) return <h1 className='text-3xl font-bold text-center'>!! No Connection Requests Found !!</h1>;

    return (
        <div>
            <h1 className='text-3xl font-bold text-center m-4 p-4'>Connection Requests</h1>
            <RequestsCard requests={requests} />
        </div>
    );
};

export default Requests;
