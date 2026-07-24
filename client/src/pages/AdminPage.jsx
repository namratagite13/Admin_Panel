

import {useState, useEffect} from 'react'
import axios from 'axios'





const AdminPage = () =>{
    
    const [lectureList, setLecturesList] = useState([])
    const [selectLectures, setSelectedLectures] = useState('')


    const [instructorsList, setInstructorList] = useState([]);
    const [selectInstructors, setSelectedInstructors] = useState('')


    const [date, setDate] = useState('')
    const [loading, setLoading] = useState(false)


    const fetchInstructor = async() =>{

        try{

            const token = localStorage.getItem('token')

            const response = await axios.get('/api/auth/instructor' , {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            

            setInstructorList(response.data.Instructors)
        }catch(error){
            console.log(error.response?.data?.message)
        }
    }

    const fetchLecture = async() =>{

        try{

            
            const token = localStorage.getItem('token')
            const response = await axios.get('/api/lecture/all', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })

            setLecturesList(response.data.Lectures)
           
        }catch(error){
            console.log(error.response?.data?.message)
        }
    }



    const handleSubmit = async(e) =>{

        e.preventDefault()
        setLoading(true)
        try{

            const token = localStorage.getItem('token');
            const response = await axios.post('/api/schedule/add' , {
                lecture: selectLectures, instructor:selectInstructors,  date
            },
            {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            }
            )

            
            if(response.data.success){
                alert('Schedule is created for lecture')
            }

           
            setSelectedLectures('')
            setSelectedInstructors('')
            setDate('')



        }catch(error){
            console.log(error.response?.data?.message)

        }finally{
            setLoading(false)
        }
    }




    useEffect(() =>{
        fetchInstructor()
    }, [])

    useEffect(() =>{
        fetchLecture()
    }, [])


    return (
    
    <div className='bg-black h-screen'>
        <div className=' flex flex-col justify-center items-center h-screen'>
         <h2 className='text-white'>Schedule Lecture</h2>
            <form onSubmit={handleSubmit} className=' flex flex-col gap-10 '>
                <select className='text-white ' value={selectInstructors} onChange={(e) => setSelectedInstructors(e.target.value)}>
                    {
                        instructorsList.map((instructor) => (
                            <option className='white p-2' key={instructor._id}>{instructor.name}</option>
                        ))
                    }
                </select>
                <select className='text-white' value={selectLectures} onChange={(e) => setSelectedLectures(e.target.value)}>
                    {
                        lectureList.map((lecture) => (
                            <option key={lecture._id}>{lecture.name}</option>
                        ))
                    }
                </select>
                <div className='text-white rounded-xl p-1'>
                    <input 
                    className='border-1 rounded-lg p-2'
                    type='date'
                    placeholder='Date'
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className='rounded-lg p-2 bg-white'>
                    <button className='text-black' disabled={loading}>
                    {loading ? 'scheduling..' : 'Submit'}
                    </button>
                </div>
                
            </form>

        </div>
        <div>

        </div>

    </div>

    )
    
    

}


export default AdminPage