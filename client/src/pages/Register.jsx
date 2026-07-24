

import {useState} from 'react'
import axios from 'axios'
import {useNaviagte} from 'react-router-dom'


const Register = () =>{

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()


    const handleSubmit = async() =>{

        try{
            setLoading(true)

            const response = await axios.post('/api/auth/register', {
                name, email, password, role

            })

            if(response.data.success){
                alert('User registered successfully')
            }

            navigate("/login")

            setName('')
            setEmail('')
            setPassword('')
            setRole('')


        }catch(error){
            console.log(error.response?.data?.message)

        }finally{
            setLoading(false)

        }

    }





    return (
        <>
        <div  className="min-h-screen bg-black">
            <div className=' text-white '>
                <form onSubmit={handleSubmit} className=" flex flex-col justify-center items-center h-screen">
                <div className='bg-white rounded-md p-2'>
                    <input 
                    className="text-black"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className='bg-white mt-2 rounded-md p-2'>
                    <input
                    className="text-black" 
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='bg-white mt-2 rounded-md p-2'>
                    <input 
                    className="text-black"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                 <div className='bg-white mt-2 rounded-md p-2'>
                    <input 
                    className="text-black"
                    placeholder="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}/>
                </div>
                <div className='bg-white mt-2 rounded-lg p-2'>
                    <button disabled={loading}  className="text-black " type="submit">{loading ? 'Signing in...': 'Register'}</button>
                </div>
                </form>
            </div>
           


        </div>
        </>
    )
}

export default Register