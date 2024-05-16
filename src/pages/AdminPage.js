import React, { useEffect, useState } from "react";

import users from "../assets/users.json";
  
import Swal from 'sweetalert2';
import { GrView } from "react-icons/gr";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const AdminPage = () => {
  const [userSelections, setUserSelections] = useState([]);
  const [editedUser, setEditedUser] = useState(null); 
  const [userssss, setUserssss] = useState(users);

  useEffect(() => {
    const userSelectionsData = JSON.parse(localStorage.getItem("userSelections"));
    setUserSelections(userSelectionsData || []);
  }, []);

  // Function to handle viewing user details
  const handleViewDetails = (user) => {
    Swal.fire({
      title: 'User Details',
      html: `
        <div>
          <p><strong>Email:</strong> ${user.username}</p>
          <p><strong>Role:</strong> ${user.isAdmin ? 'Admin' : 'User'}</p>
        </div>
      `,
      confirmButtonText: 'Close',
      width: 400
    });
  };

   // Function to handle editing user details
   const handleEditDetails = (user) => {
    setEditedUser(user);
    Swal.fire({
      title: 'Edit User',
      html: `
        <input id="editedUsername" class="swal2-input" value="${user.username}" placeholder="Username">
        <select id="editedRole" class="swal2-input">
          <option value="Yes" ${user.isAdmin ? 'selected' : ''}>Admin</option>
          <option value="No" ${!user.isAdmin ? 'selected' : ''}>User</option>
        </select>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: () => {
        const editedUsername = document.getElementById('editedUsername').value;
        const editedRole = document.getElementById('editedRole').value;
        // Update user details in state
        setUserSelections(prevState =>
          prevState.map(u =>
            u.username === user.username ? { ...u, username: editedUsername, isAdmin: editedRole === 'Yes' } : u
          )
        );
      }
    });
  };

  // Function to handle deleting user details
  const handleDeleteDetails = (username) => {
    Swal.fire({
      title: 'Confirm Deletion',
      text: `Are you sure you want to delete the user ${users.username}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Filter out the deleted user
        const updatedUsers = users.filter(user => user.username !== username);
        setUserssss(updatedUsers);
        Swal.fire({
          title: 'Deleted!',
          text: `User ${users.username} has been deleted.`,
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center text-2xl my-10">Admin Panel - User List</h1>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Username
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Admin
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
                
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {user.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.isAdmin ? "Yes" : "No"}
                    </div>
                  </td>
                  <div className="flex justify-around w-1/3">
                  <td>
                    <button
                      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 rounded-xl"
                      onClick={() => handleViewDetails(user)}
                    >
                      <GrView/>
                    </button>
                  </td>
                  <td>
                    <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={() => handleEditDetails(user)}
                    ><MdEdit/></button>
                  </td>
                  <td>
                    <button className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    onClick={()=>handleDeleteDetails(user.username)}
                    ><MdDelete/></button>
                  </td>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
