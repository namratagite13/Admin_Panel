import { useState, useEffect } from 'react';
import axios from 'axios';

import {Link} from 'react-router-dom'




const Instructor = () => {
    const [lectures, setLectures] = useState([]);
 

    const fetchLecturesForInstructor = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:8080/api/schedule/my-schedule', {
                headers: {
                    Authorization: `Bearer ${token}`
            }});


            setLectures(response.data.all || []);
        }catch (error) {
            console.error('Fetch Error:', error.response?.data?.message || error.message);
        } 
    };

  useEffect(() => {
    fetchLecturesForInstructor();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-6">
      <h1 className="text-lg flex justify-center items-center">My Assigned Schedule</h1>


    {
        lectures.length === 0 ? (
            <p className='flex justify-center items-center text-2xl mt-5'>No lecture is assign to you!!</p>
                
        ) : (
            <div>
                {lectures.map((item) => (
            <div key={item._id} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h2 className=" bg-black rounded-lg p-2 text-white">
                    Name: {item.lecture?.name || 'N/A'}
                </h2>
                <p className=" bg-black rounded-lg p-2 text-white">
                    Level: {item.lecture?.level || 'N/A'}
                </p>
                <p className=" bg-black rounded-lg p-2 text-white">
                    Description: {item.lecture?.description || 'N/A'}
                </p>
            </div>
            ))}

            </div>
            
        )
    }
      
    </div>
  );
};

export default Instructor;