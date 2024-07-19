
import { Eye, EyeOff } from 'lucide-react';  
import React, { useState } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData);
      const { access_token, role } = response.data;
      localStorage.setItem('token', access_token);
      setSuccess(true);
      // console.log('Login successful, token:', access_token);
      if(role === 'user'){
        navigate('/user');
      }else if(role === 'manager'){
        navigate('/manager');
      }else if(role === 'admin'){
        navigate('/admin');
      }else{
        setError('invalid role')
      }

    } catch (error) {
      setError('Invalid email or password');
      console.error('Login error:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
        {error && <div className="bg-red-200 text-red-700 p-2 rounded mb-4">{error}</div>}
        {success && <div className="bg-green-200 text-green-700 p-2 rounded mb-4">Login successful!</div>}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors duration-300 ease-in-out w-full max-w-xs">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}



