import React, { useEffect } from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
      dispatch(addUser(res?.data?.data));
    }
    catch (err) {
      console.log(err);
      if (err.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    if (!userData) fetchUser();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <NavBar />

      <div className="flex-grow flex justify-center items-center">
        <Outlet />
      </div>

      <Footer />
    </div>
  )
}

export default Body