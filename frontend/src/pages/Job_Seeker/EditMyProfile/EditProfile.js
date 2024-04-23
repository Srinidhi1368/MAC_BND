import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EditProfile = () => {
    const email = localStorage.getItem("email");
    const [userData, setuserData] = useState([]);
console.log(userData);
    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get(
            `http://localhost:8080/api/user?email=${email}`
          );
          setuserData(response.data.userDetails);
        };
        fetchData();
      }, [email]);
  return (
    <div>EditProfile</div>
  )
}

export default EditProfile