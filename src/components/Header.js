import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Header.css";
import { useDispatch } from "react-redux";
import { getTodo, searchTodo } from "../Redux/todoSlice";
import { searchwithImg, showwithImg } from "../Redux/withImgSlice";

function Header() {
  const [showCalendar, setShowCalendar] = useState(false);
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(searchTodo(e.target.value));
    dispatch(searchwithImg(e.target.value));
  };

  return (
    <div className="mt-3 header-div shadow-sm">
      <Container>
        <div className="main d-flex align-items-center justify-content-evenly">
          <div className="user-sec d-flex align-items-center gap-2">
            <img src="https://i.postimg.cc/cJK3cz1s/download.jpg" alt="" />
            <div>
              <b>John Dane</b>
              <p className="m-0">johndane@gmail.com</p>
            </div>
          </div>
          <div className="search-sec p-1 d-flex rounded ms-5">
            <img
              src="https://i.postimg.cc/5tgzHLxL/download-removebg-preview-8.png"
              alt=""
            />
            <input
              type="text"
              placeholder="Search anything..."
              onChange={handleSearch}
            />
          </div>
          <div className="icons-sec d-flex gap-5 align-items-center">
            <div
              className="calendar-container"
              onMouseEnter={() => setShowCalendar(true)}
              onMouseLeave={() => setShowCalendar(false)}
            >
              <img
                src="https://i.postimg.cc/LXFZ8VN3/image-17.png"
                alt=""
                className="calender"
              />
              {showCalendar && (
                <div className="calendar-popup">
                  <Calendar />
                </div>
              )}
            </div>
            <img
              src="https://i.postimg.cc/vH58QdCk/image-18.png"
              alt="Refreh icon"
              title="Refresh"
              onClick={() => {
                dispatch(getTodo());
                dispatch(showwithImg());
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Header;
