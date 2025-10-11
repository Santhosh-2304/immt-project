import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await api
      .delete(`/users/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className='userTable'>
        <div className='userHeader'> <button className="btn outline" onClick={() => navigate('/dashboard')} style={{height:"40%"}}>Back</button><h1>Users</h1>
        <button className='user-add' onClick={() => navigate('/UserCreate')}><i class="fa-solid fa-user-plus"></i> Create User</button></div> 
        <div className="userTable-content">
        <table className='table slide-up' style={{borderCollapse:"collapse"}}>
            <thead>
                <tr>
                    <th scope="col">S.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">User type</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email} </td>
                <td>{user.type}</td>
                <td>{user.isActive ? '✅' : '❌'}</td>
                <td><Link to ={`/update/`+user._id} type="button" class="btn btn-warning" style={{backgroundColor:"#81a7ffff", marginRight:"5px",paddingTop:"5px"}}><i class="fa-solid fa-pen-to-square"></i></Link>
                <button type="button" onClick={() => { if (window.confirm("Are you sure you want to delete this user?")) {deleteUser(user._id);}}}class="btn btn-danger" style={{backgroundColor:"#ff5050ff"}}><i class="fa-solid fa-trash"></i> </button>
                                   
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
    </div>
    </div>
  )
}

export default User
