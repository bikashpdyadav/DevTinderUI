import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName,
        lastName,
        emailId,
        password
      }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      navigate("/profile");
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong!!");
    }
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password
      }, { withCredentials: true });
      dispatch(addUser(res?.data?.data));
      navigate("/");
    }
    catch (err) {
      setError(err?.response?.data || "Something went wrong!!");
    }
  };

  return (
    <div className='flex justify-center'>
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "Login":"Signup"}</h2>
          <div>
            {!isLoginForm &&
              <>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    placeholder="Type here"
                    onChange={(e) => setFirstName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    placeholder="Type here"
                    onChange={(e) => setLastName(e.target.value)} className="input input-bordered w-full max-w-xs" />
                </label>
              </>
            }
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                value={emailId}
                placeholder="Type here"
                onChange={(e) => setEmailId(e.target.value)} className="input input-bordered w-full max-w-xs" />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input type="text" value={password} placeholder="Type here" onChange={(e) => setPassword(e.target.value)} className="input input-bordered w-full max-w-xs" />
            </label>
          </div>
          <p className='text-red-400'>{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin:handleSignup}>{isLoginForm ? "Login":"Signup"}</button>
          </div>
          <p className='flex justify-center cursor-pointer m-2 p-2' onClick={() => setIsLoginForm(!isLoginForm)}>{isLoginForm ? "New User? SignUp here":"Already have account? Login here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login;