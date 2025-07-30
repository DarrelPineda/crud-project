import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserList = () => {
  const [user, setUser] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:5000/crud/users');
      setUser(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []); // Added [] to avoid infinite loop

  const deleteUser = async id => {
    try {
      const res = await axios.delete(`http://localhost:5000/crud/users/${id}`);
      fetchUser(); 
      alert(res.data.message);
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  const UpdateUser = async () => {
    try {
      await axios.put(`http://localhost:5000/crud/users/${editUser.id}`, editUser);
      setEditUser(null);
      fetchUser();
      alert("Update is Successfully");
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  return (
    <div>
      <ul>
        {user.map(user => (
          <li key={user.id}>
            {editUser?.id === user.id ? (
              <>
                <input value={editUser.name} onChange={e => setEditUser({ ...editUser, name: e.target.value })} />
                <input value={editUser.email} onChange={e => setEditUser({ ...editUser, email: e.target.value })} />
                <button onClick={UpdateUser}>SAVE</button>
              </>
            ) : (
              <>
                {user.name} ({user.email})
                <button onClick={() => setEditUser(user)}>Update</button>
                <button onClick={() => deleteUser(user.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
