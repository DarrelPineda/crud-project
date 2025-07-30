import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [user, setUser] = useState({ name: '', email: '' });

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/crud/users', user);
      setUser({ name: '', email: '' });
      alert("User added successfully");
    } catch (err) {
      alert("Error adding user");
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Enter Name" />
      <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Enter Email" />
      <button type="submit">Add User</button>
    </form>
  );
};

export default UserForm;
