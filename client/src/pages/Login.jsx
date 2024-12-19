// pages/Login.js
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import process from 'process';

// import { generateToken } from '../Hooks/jwtTokenGeneator.js'; // Ensure correct import path

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Added error state
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
            setError('Invalid email or password. Please try again.'); // Set error message
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <input 
                    type="text"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <input 
                    type="password" // Use type "password" for security
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type='submit'>Login</button>
            </form>
        </div>
    );
}
