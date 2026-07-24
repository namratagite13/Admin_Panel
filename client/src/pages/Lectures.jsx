


import {useState, useEffect} from 'react'
import axios from 'axios'

import {useNavigate, Link} from 'react-router-dom'



const Lectures = () =>{


    const [name, setName] = useState('')
    const [level, setLevel] = useState('')
    const [description, setDescription] = useState('')
    const [lectures, setLectures] = useState([])

    
    const fetchLectures = async() =>{

        try{

            
            const token = localStorage.getItem('token')
            const response = await axios.get('/api/lecture/all', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setLectures(response.data.Lectures || response.data.lectures || [])
            
        }catch(error){
            console.log(error.response?.data?.message)
        }
    }



    useEffect(() =>{
        fetchLectures()
    }, [])



    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{

            const token = localStorage.getItem('token')
            const response = await axios.post('/api/lecture/create', {
                name, level, description
            }, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setName('')
            setLevel('')
            setDescription('')

            await fetchLectures()

        }catch(error){
            console.log(error.response?.data?.message)

        }
    }



    return (
        <>
        <div className='bg-black  h-fit'>
            

            <div className='flex flex-col justify-center items-center pt-10'>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input 
                        className='bg-white placeholder:text-black  rounded-lg p-2'
                        placeholder='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                    </div>
                     <div>
                        <input 
                        className='bg-white placeholder:text-black  rounded-lg p-2 mt-2'
                        placeholder='level'
                        value={level}
                        onChange={(e) => setLevel(e.target.value)}/>
                    </div>
                    <div>
                        <textarea 
                        className='bg-white placeholder:text-black  rounded-lg p-2 mt-2'
                       
                        placeholder='description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div>
                        <button className='bg-white text-black p-2 rounded-lg' type='submit'>
                        submit
                       </button>
                    </div>
                    <div>
                        <Link to={"/admin"}>
                        <button className='bg-white text-black p-2 rounded-lg mt-2' >Back to scheduling</button>
                        </Link>
                    </div>
                </form>
            </div>

            <div className='flex justify-center items-center mt-5 mb-5'>
                <h1>All Lectures as follows</h1>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-white'>
                {
                    lectures.map((lecture) =>(
                         <div key={lecture._id} className='bg-gray-800 p-2 m-2'>
                                <h2 className='bg-black p-2 rounded-lg'>Name: {lecture.name}</h2>
                                <p className='bg-black p-2 rounded-lg mt-2'>Level: {lecture.level}</p>
                                <p className='bg-black p-2 rounded-lg mt-2'>Description: {lecture.description}</p>
                        </div>
                       
                    ))
                }
            </div>
        </div>

        </>
    )
}


export default Lectures