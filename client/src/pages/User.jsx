import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const User = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/userRoutes");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await api
      .delete(`/userRoutes/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className='userTable'>
        <div className='userHeader'> <button className="btn outline" onClick={() => navigate('/dashboard')} style={{height:"40%"}}>Back</button><h1>Users</h1>
        <button className='user-add' onClick={() => navigate('/UserCreate')}><i class="fa-solid fa-user-plus"></i> Create User</button></div> 
        <table className='table' style={{borderCollapse:"collapse"}}>
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
                <td><button type="button" class="btn btn-warning" style={{backgroundColor:"orange", marginRight:"5px"}}><i class="fa-solid fa-pen-to-square"></i></button>
                <button type="button" class="btn btn-danger" style={{backgroundColor:"red"}}><i class="fa-solid fa-trash"></i> </button>
                                   
                </td>
              </tr>
            );
          })}
        </tbody>
        </table>
    </div>
  )
}

export default User