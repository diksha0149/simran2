import React from "react";
import Header from "./Navbar/Header";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";
import "./CodingProblems/CodingProblems.css";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   Typography,
// } from "@material-tailwind/react";
const Dashboard = () => {
  const navigate = useNavigate();
  const [screams, setScreams] = useState([]);
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await axios.get("http://localhost:5000/api/allScreams");
      console.log(data.data.screams);
      setScreams(data.data.screams);
    };
    fetchdata();
  }, []);
  const logged_user = localStorage.getItem("user");
  return (
    <>
      <div className="main">
        <div className="div1">
          <Header />
        </div>
        <div className="div2">
          <div>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
              }}
            >
              Logout
            </button>
            <div>{logged_user}</div>
            {screams.map((scream, index) => (
              <div key={index}>
                <div className="container">
                  <div className="card">
                    <div className="card__footer">
                      <div className="user">
                        <img
                          src="https://i.pravatar.cc/40?img=1"
                          alt="user__image"
                          className="user__image"
                        />
                        <div className="user__info">
                          <h5>Jane Doe</h5>
                          <small>2h ago</small>
                        </div>
                        <div className="link">fbheb</div>
                      </div>
                    </div>
                    <div className="card__body">
                      <span className="tag tag-blue">Technology</span>
                      <h4>{scream.title}</h4>
                      <p>{scream.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
