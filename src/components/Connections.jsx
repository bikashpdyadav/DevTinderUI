import React, { useEffect,useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionsSlice';
import UserCard from './UserCard';

const Connections = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connections);
    console.log(connections)
    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            //console.log(res)
            dispatch(addConnections(res?.data?.data))
        }
        catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    if (!connections) return;
    if (connections.length === 0) return <h1 className='text-3xl font-bold'>!! No connections found !!</h1>
    return (
        <div>
            <h1 className='text-3xl font-bold flex justify-center m-4 p-4'>Connections</h1>
            <ConnectionsCard users={connections} />
        </div>
    )
};

export default Connections;