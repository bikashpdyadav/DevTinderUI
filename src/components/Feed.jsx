import React, { useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL+"/feed", {withCredentials: true});
      dispatch(addFeed(res?.data));
    }
    catch(err){
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if(!feed) return;
  if(feed.length === 0) return <h1>!! No Users to Show !!</h1>
  return (
    <div className='flex justify-center items-center'>
      <UserCard user={feed[0]} />
    </div>
  )
}

export default Feed