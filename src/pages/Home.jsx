import React,{useEffect,useState} from 'react'
import { Container, Button } from 'react-bootstrap'
import "../styles/Home.css"
import axios from "axios"
import API_URL from "../../config/global";
export const Home = () => {
  const [res,setRes]=useState({})

  useEffect(() => {
    const user=JSON.parse(localStorage.getItem("userInfo"));
    if (user && user.token ) {
      getData(user.token)
    }
  },[])

  const getData =async (token) => {
    try{
      const config = {
        headers :
        {
          Authorization:token
        }
      }



      const response = await axios.get(`${API_URL}/home`, config  );
        console.log(response);

        if (response.data === "Invaild Token") {
          alert("login again")
        }else if (response.data === "Server Busy") {
          alert("unauthorised access")
        }else if(response?.status) {
setRes(response.data)
        }

       }catch (e) {
       console.log(e);
     }
  };

  return (
    <Container>
      <h1>Welcome to our Website</h1>
      <p>we are here to serve you</p>
      <p>{res.name}</p>  
      <Button variant="primary" type="submit">
       lets get started  </Button>
           
    </Container>
  );
};


export default Home;