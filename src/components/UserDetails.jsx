import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user details.");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleNavigation = (direction) => {
    const newId = direction === "next" ? parseInt(id) + 1 : parseInt(id) - 1;
    if (newId > 0 && newId <= 10) navigate(`/user/${newId}`);
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate("/")}>
        Back to Users List
      </button>
      <h1 className="mb-4">{user.name}</h1>
      <ul className="list-group">
        <li className="list-group-item">
          <strong>Email:</strong> {user.email}
        </li>
        <li className="list-group-item">
          <strong>Phone:</strong> {user.phone}
        </li>
        <li className="list-group-item">
          <strong>Website:</strong> {user.website}
        </li>
        <li className="list-group-item">
          <strong>Address:</strong>{" "}
          {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
        </li>
        <li className="list-group-item">
          <strong>Company:</strong>{" "}
          {`${user.company.name} - ${user.company.catchPhrase} (${user.company.bs})`}
        </li>
      </ul>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary"
          onClick={() => handleNavigation("previous")}
          disabled={id <= 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => handleNavigation("next")}
          disabled={id >= 10}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
