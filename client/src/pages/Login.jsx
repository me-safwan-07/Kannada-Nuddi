import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import process from 'process';
import toast from 'react-hot-toast';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsLoggedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const correctEmail = process.env.REACT_APP_ADMIN_EMAIL; 
    const correctPassword = process.env.REACT_APP_ADMIN_PASSWORD;

    const generateRandomString = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: 50 }, () => characters[Math.floor(Math.random() * characters.length)]).join('');
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
            navigate('/dashboard');
        }
    }, [setIsLoggedIn, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (correctEmail === email && correctPassword === password) {
            const token = generateRandomString();
            localStorage.setItem('authToken', token);
            setIsLoggedIn(true);
            navigate('/dashboard');
        } else {
            setError('Invalid email or password. Please try again.');
            toast.error('Invalid email or password. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-black-100">
            <div className="bg-black shadow-lg rounded-lg p-8 w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <h2 className="text-3xl font-bold text-center">Login</h2>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div>
                        <input 
                            type="text"
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <input 
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg text-black focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        />
                    </div>
                    <button 
                        type='submit' 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 rounded-lg transition duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
