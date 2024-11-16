import React from "react";
import { FaCog, FaTimes } from "react-icons/fa";
import "./Dashboard.css";

const users = [
  {
    id: 1,
    name: "Michael Holz",
    dateCreated: "04/10/2013",
    role: "Admin",
    status: "Active",
    avatar: "https://i.pravatar.cc/50?img=1",
  },
  {
    id: 2,
    name: "Paula Wilson",
    dateCreated: "05/08/2014",
    role: "Publisher",
    status: "Active",
    avatar: "https://i.pravatar.cc/50?img=2",
  },
  {
    id: 3,
    name: "Antonio Moreno",
    dateCreated: "11/05/2015",
    role: "Publisher",
    status: "Suspended",
    avatar: "https://i.pravatar.cc/50?img=3",
  },
  {
    id: 4,
    name: "Mary Saveley",
    dateCreated: "06/09/2016",
    role: "Reviewer",
    status: "Active",
    avatar: "https://i.pravatar.cc/50?img=4",
  },
  {
    id: 5,
    name: "Martin Sommer",
    dateCreated: "12/08/2017",
    role: "Moderator",
    status: "Inactive",
    avatar: "https://i.pravatar.cc/50?img=5",
  },
];

const UserTable = () => {
  return (
    <div className="user-table-container">
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Date Created</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td className="user-info">
                <img src={user.avatar} alt={user.name} className="avatar" />
                {user.name}
              </td>
              <td>{user.dateCreated}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`status ${
                    user.status.toLowerCase() === "active"
                      ? "active"
                      : user.status.toLowerCase() === "suspended"
                      ? "suspended"
                      : "inactive"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="actions">
                <button className="edit-btn">
                  <FaCog />
                </button>
                <button className="delete-btn">
                  <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
