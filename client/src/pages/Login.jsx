import { useState} from "react"
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom'


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setLoading(true)
        try{
            const response = await axios.post('/api/auth/login', {
                email: email.trim().toLowerCase(),
                password
            })


            if(response.data.success){
                const user = response.data.User ;
                const token = response.data.token ;
                
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));

                
                setEmail('')
                setPassword('')


                if(user?.role === 'admin'){
                    navigate('/admin')
                }else if(user?.role === 'instructor'){
                    navigate('/instructor')
                }else{
                    navigate('/login')
                }
            
            }
        
        }catch(error){
            console.log(error.response?.data?.message)

        }finally{
            setLoading(false)

        }
    }

    return (
        <>
        <div className=" bg-black h-screen">
            <form onSubmit={handleSubmit} className="h-screen flex flex-col justify-center items-center">
                <div className="bg-white p-2 rounded-lg">
                    <input 
                    className=""
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </div>
                 <div className="bg-white p-2 rounded-lg mt-2">
                    <input 
                    className=""
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="bg-white rounded-lg p-2 m-2">
                    <button disabled={loading} className="text-black" type="submit"> {loading ? 'logging in...' : 'Login'}</button>
                </div>
                <div className='bg-white mt-2 rounded-lg p-2'>
                    <Link to={"/"}>
                    <button className="text-black ">No Account? Register</button>
                    </Link>
                </div>
            </form>
        </div>
        </>
    )

}



export default Login