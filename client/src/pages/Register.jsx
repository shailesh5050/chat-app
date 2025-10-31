
import React, { useState } from 'react';
import './LoginRegister.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle register logic here
    registerUser({ username:name, email, password });


  };

  async function registerUser(credentials) {
    try {
      const response = await axios.post('http://localhost:3000/api/user/register', credentials);
        if(response.status===201){
        setName('');
        setEmail('');
        setPassword('');
      }
      return response.data;
    } catch (error) {
      console.error('There was an error registering!', error);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Register</h2>
        <div className="auth-field">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
          />
        </div>
        <button className="auth-btn" type="submit">Register</button>
        <p className="auth-link">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;